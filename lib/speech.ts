// Client-side Web Speech helpers (TTS out, STT in). All feature-detected.

// --- Text to speech ---
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) cachedVoices = voices;
  return cachedVoices;
}

// Prime the voice list — some browsers populate it asynchronously.
export function primeVoices(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => loadVoices();
}

function pickGermanVoice(): SpeechSynthesisVoice | undefined {
  const voices = loadVoices();
  // Prefer Swiss German, then any German.
  return (
    voices.find((v) => v.lang.toLowerCase() === 'de-ch') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('de')) ||
    undefined
  );
}

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, rate: number): void {
  if (!ttsSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything currently speaking
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickGermanVoice();
  if (voice) utter.voice = voice;
  utter.lang = voice?.lang || 'de-DE';
  utter.rate = rate;
  synth.speak(utter);
}

export function stopSpeaking(): void {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

// --- Speech to text ---
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as any;
  return w.webkitSpeechRecognition || w.SpeechRecognition;
}

export function sttSupported(): boolean {
  return getRecognitionCtor() !== undefined;
}

// Start dictation. onInterim receives the running transcript (interim + final);
// onFinal fires once when recognition ends with the final transcript. Returns a
// stop() function, or null if unsupported.
export function startDictation(
  onInterim: (text: string) => void,
  onFinal: (text: string) => void,
  onError?: () => void,
): (() => void) | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;

  const rec = new Ctor();
  rec.lang = 'de-DE';
  rec.interimResults = true;
  rec.continuous = false;

  let finalText = '';

  rec.onresult = (event: any) => {
    let interim = '';
    finalText = '';
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalText += transcript;
      else interim += transcript;
    }
    onInterim((finalText + interim).trim());
  };
  rec.onerror = () => onError?.();
  rec.onend = () => onFinal(finalText.trim());

  try {
    rec.start();
  } catch {
    return null;
  }
  return () => {
    try {
      rec.stop();
    } catch {
      // ignore
    }
  };
}
