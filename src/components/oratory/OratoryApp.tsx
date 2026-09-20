import { useCallback, useEffect, useRef, useState } from "react";
import type { Analysis, Drill, Lesson } from "../../oratory/types";
import { DIMENSION_BLURB, DIMENSION_LABEL } from "../../oratory/types";
import { analyze } from "../../oratory/analyze";
import {
  analyzeDelivery,
  DELIVERY_LABEL,
  type DeliveryCapture,
  type DeliveryReport,
} from "../../oratory/delivery";
import { coachDelivery, coachPassage } from "../../oratory/coach";
import { llmMarkedUnavailable } from "../../game/llm";
import type { Progress } from "../../hooks/useProgress";
import { OratoryHome } from "./OratoryHome";
import { LessonView } from "./LessonView";
import { WriteDrill } from "./WriteDrill";
import { SpeakDrill } from "./SpeakDrill";
import { ScoreReport, type CoachState, type ReportFinding, type ReportItem } from "./ScoreReport";
import { playVerdict } from "../../game/sounds";

interface OratoryAppProps {
  progress: Progress;
  onRecordDrill: (drillId: string, score: number) => number;
  onSaveDraft: (drillId: string, text: string) => void;
  onExit: () => void;
}

type View = "home" | "lesson" | "drill" | "report";

interface Result {
  drill: Drill;
  lesson: Lesson;
  overall: number;
  items: ReportItem[];
  findings: ReportFinding[];
  xpGained: number;
  previousBest?: number;
  headline: string;
}

function writtenResult(analysis: Analysis): { items: ReportItem[]; findings: ReportFinding[] } {
  return {
    items: analysis.scores.map((s) => ({
      label: DIMENSION_LABEL[s.dimension],
      score: s.score,
      detail: s.detail,
      blurb: DIMENSION_BLURB[s.dimension],
    })),
    findings: analysis.findings.map((f) => ({
      kind: f.kind,
      tag: DIMENSION_LABEL[f.dimension],
      label: f.label,
      quote: f.quote,
      note: f.note,
    })),
  };
}

function spokenResult(report: DeliveryReport): { items: ReportItem[]; findings: ReportFinding[] } {
  return {
    items: report.scores.map((s) => ({
      label: DELIVERY_LABEL[s.dimension],
      score: s.score,
      detail: s.detail,
    })),
    findings: report.findings.map((f) => ({
      kind: f.kind,
      tag: DELIVERY_LABEL[f.dimension],
      label: f.label,
      note: f.note,
    })),
  };
}

export function OratoryApp({
  progress,
  onRecordDrill,
  onSaveDraft,
  onExit,
}: OratoryAppProps) {
  const [view, setView] = useState<View>("home");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [drill, setDrill] = useState<Drill | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [coach, setCoach] = useState<CoachState>({ status: "off" });
  // Guards against a coaching response arriving after the student moved on.
  const attemptId = useRef(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, lesson?.id, drill?.id]);

  const saveDraft = useCallback(
    (text: string) => {
      if (drill) onSaveDraft(drill.id, text);
    },
    [drill, onSaveDraft]
  );

  const finishAttempt = (
    theLesson: Lesson,
    theDrill: Drill,
    overall: number,
    parts: { items: ReportItem[]; findings: ReportFinding[] },
    headline: string
  ) => {
    const previousBest = progress.drills[theDrill.id]?.bestScore;
    const xpGained = onRecordDrill(theDrill.id, overall);
    playVerdict(overall >= 70 ? 4 : overall >= 45 ? 1 : -2);
    setResult({
      drill: theDrill,
      lesson: theLesson,
      overall,
      items: parts.items,
      findings: parts.findings,
      xpGained,
      previousBest,
      headline,
    });
    setView("report");
  };

  const askCoach = (run: () => Promise<void>) => {
    if (!progress.settings.apiEnabled || llmMarkedUnavailable()) {
      setCoach({ status: "off" });
      return;
    }
    setCoach({ status: "loading" });
    run().catch((e: unknown) => {
      setCoach({
        status: "failed",
        reason: e instanceof Error ? e.message : "unknown error",
      });
    });
  };

  const handleWritten = (text: string) => {
    if (!drill || !lesson) return;
    const analysis = analyze(text, drill.targets);
    const id = ++attemptId.current;
    finishAttempt(lesson, drill, analysis.overall, writtenResult(analysis), "Your draft");

    askCoach(async () => {
      const coaching = await coachPassage(lesson, drill, text, analysis);
      if (attemptId.current === id) setCoach({ status: "ready", coaching });
    });
  };

  const handleSpoken = (capture: DeliveryCapture) => {
    if (!drill || !lesson) return;
    const report = analyzeDelivery(capture);
    const id = ++attemptId.current;
    finishAttempt(lesson, drill, report.overall, spokenResult(report), "Your delivery");

    if (report.metrics.silent) {
      setCoach({ status: "off" });
      return;
    }
    askCoach(async () => {
      const coaching = await coachDelivery(lesson, drill, capture.transcript, report.metrics);
      if (attemptId.current === id) setCoach({ status: "ready", coaching });
    });
  };

  const openDrill = (d: Drill) => {
    attemptId.current++;
    setCoach({ status: "off" });
    setDrill(d);
    setView("drill");
  };

  const backToLesson = () => {
    attemptId.current++;
    setCoach({ status: "off" });
    setView("lesson");
    setDrill(null);
    setResult(null);
  };

  if (view === "home" || !lesson) {
    return (
      <OratoryHome
        records={progress.drills}
        lifetimeXp={progress.lifetimeXp}
        onOpenLesson={(l) => {
          setLesson(l);
          setView("lesson");
        }}
        onExit={onExit}
      />
    );
  }

  if (view === "lesson") {
    return (
      <LessonView
        lesson={lesson}
        records={progress.drills}
        onStartDrill={openDrill}
        onBack={() => {
          setLesson(null);
          setView("home");
        }}
      />
    );
  }

  if (view === "drill" && drill) {
    if (drill.kind === "speak") {
      // A speaking drill with no script of its own delivers whatever the
      // student last wrote in this lesson.
      const written = lesson.drills
        .filter((d) => d.kind !== "speak")
        .map((d) => progress.drafts[d.id])
        .find((text) => text && text.trim().length > 0);

      return (
        <SpeakDrill
          lesson={lesson}
          drill={drill}
          fallbackScript={drill.script ?? written ?? ""}
          onSubmit={handleSpoken}
          onBack={backToLesson}
        />
      );
    }

    return (
      <WriteDrill
        lesson={lesson}
        drill={drill}
        initialText={progress.drafts[drill.id] ?? ""}
        onDraftChange={saveDraft}
        onSubmit={handleWritten}
        onBack={backToLesson}
      />
    );
  }

  if (view === "report" && result) {
    return (
      <ScoreReport
        overall={result.overall}
        headline={`${result.lesson.title} · ${result.headline}`}
        items={result.items}
        findings={result.findings}
        xpGained={result.xpGained}
        previousBest={result.previousBest}
        coachNote={result.drill.coachNote}
        coach={coach}
        onRetry={() => {
          attemptId.current++;
          setCoach({ status: "off" });
          setDrill(result.drill);
          setView("drill");
        }}
        onBack={backToLesson}
      />
    );
  }

  return null;
}
