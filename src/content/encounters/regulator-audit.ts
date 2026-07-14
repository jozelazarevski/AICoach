import type { Encounter } from "../../game/types";

export const regulatorAudit: Encounter = {
  id: "regulator-audit",
  title: "The Audit",
  difficulty: "adversarial",
  opponent: {
    name: "The Examiner",
    role: "A regulator who arrives unannounced for a compliance examination",
    archetype: "External Counterpart",
    blurb: "She has statutory authority and no deadline pressure. Your legal lead is traveling and unreachable for two hours. Everything you say, and everything you hand over, becomes part of the examination record.",
  },
  scene:
    "A compliance examiner arrives at your office without prior notice. She presents credentials and a letter of examination authority. She says she is here to conduct an examination of your data governance practices and requests access to records and a sit-down with the responsible executive. Your legal lead is on a plane. Your general counsel is in a board meeting. You are the most senior person available.",
  objective:
    "Cooperate professionally without consenting to more than you have authority to consent to, and buy time to get legal present without obstructing the examination.",
  startStanding: 30,
  startMomentum: 14,
  stages: [
    {
      id: "s1",
      prompt: "I am here to conduct a compliance examination of your data governance practices. I need access to your records and a meeting with the responsible executive. Are you able to assist me.",
      choices: [
        {
          id: "s1a",
          tag: "Welcome her and buy time for legal",
          line:
            "I am glad to assist and I want to make sure you have everything you need. I am going to ask you for thirty minutes to reach our legal counsel, who should be present for this conversation. I am not asking to obstruct the examination. I am asking to make sure it is conducted properly.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Thirty minutes is acceptable. I will wait in your conference room.",
          principle:
            "Welcoming the examiner while requesting time to get legal present is the textbook response. It signals cooperation while protecting your ability to respond accurately. Examiners expect this request and generally honor it.",
          keywords: ["glad to assist", "thirty minutes", "legal counsel", "not obstructing", "conducted properly", "should be present"],
        },
        {
          id: "s1b",
          tag: "Cooperate immediately without legal",
          line:
            "Of course. I am the responsible executive for data governance. I am happy to sit down with you now.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "Good. I will need to see your data retention schedule and the most recent audit log from your data handling systems.",
          principle:
            "Agreeing to a regulatory examination without legal counsel present is a significant error. You may answer questions inaccurately, produce documents you should not produce, or make statements that become part of the record without understanding their implications.",
          keywords: ["happy to sit down", "right now", "cooperate immediately", "no legal needed", "I am responsible"],
        },
        {
          id: "s1c",
          tag: "Ask for the examination letter",
          line:
            "Before anything else, I would like to review the examination authority letter you mentioned. I want to understand the scope of what you are authorized to examine.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "Of course. Here is the letter. The scope covers data handling and retention practices for the past twenty-four months.",
          principle:
            "Asking to review the authority letter is not obstruction. It is due diligence. You need to understand what she is authorized to examine before you decide what to provide and to whom.",
          keywords: ["examination letter", "authority letter", "review first", "scope of examination", "authorized to examine"],
        },
        {
          id: "s1d",
          tag: "Decline until legal is present",
          line:
            "I am not in a position to assist with an examination without legal counsel present. I will need you to reschedule.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "I do not require your consent to conduct this examination. Declining to assist is itself a matter of record.",
          principle:
            "Declining outright to assist is not the same as requesting time to get legal present. Outright refusal can be characterized as obstruction and goes into the examination record. The right move is to request time, not to refuse.",
          keywords: ["decline", "reschedule", "not in a position", "cannot assist", "refuse", "not without legal"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a decision on whether you are willing to cooperate.",
        principle: "Request thirty minutes to reach legal counsel. Frame it as ensuring the examination is conducted properly, not as resistance. That framing is both true and strategically correct.",
      },
    },
    {
      id: "s2",
      prompt: "While we are waiting, can you tell me generally how your data retention process works. I am just trying to understand the landscape.",
      choices: [
        {
          id: "s2a",
          tag: "Decline informal conversation before legal arrives",
          line:
            "I appreciate the question and I want to be forthcoming, but I would prefer to wait until legal counsel joins us before discussing any specifics of our processes. That is not a reflection on the question. It is how we handle examination conversations.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction: "Understood. I will note that the company requested counsel before substantive conversation.",
          principle:
            "Informal pre-conversation with a regulator while you are waiting for legal is still on the record. 'Just to understand the landscape' does not reduce the evidentiary weight of what you say.",
          keywords: ["wait for legal", "prefer to wait", "not before counsel", "not discussing specifics", "examination conversations", "forthcoming but"],
        },
        {
          id: "s2b",
          tag: "Give a high-level overview",
          line:
            "Sure. At a high level, we retain user data according to our privacy policy, which specifies deletion windows for different data categories.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "What are those deletion windows specifically.",
          principle:
            "Beginning substantive conversation before legal arrives, even at a high level, opens doors you may not be able to close. One answer invites the next question and you are now in an unguided examination.",
          keywords: ["high level", "overview", "sure", "privacy policy", "deletion windows", "explain the process"],
        },
        {
          id: "s2c",
          tag: "Redirect to the written materials",
          line:
            "I think our documentation will give you a clearer picture than anything I could describe in conversation. I would rather let the records speak for themselves once we have counsel here to help me make sure we are giving you the right set.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction: "That is a reasonable approach.",
          principle:
            "Offering documentation rather than verbal description is smart. It is also honest: the records are more accurate than your off-the-cuff summary, and it delays substantive conversation until legal is present.",
          keywords: ["documentation", "records speak for themselves", "right set", "let the records", "written materials", "rather than conversation"],
        },
        {
          id: "s2d",
          tag: "Ask what she already knows",
          line:
            "Can you tell me what prompted this examination. That would help me direct you to the most relevant people and materials.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction: "I am not able to discuss the basis for the examination. That is standard protocol.",
          principle:
            "Asking what prompted the examination is a natural instinct but a poor tactical move. It reads as trying to understand what they know before you respond, and she will decline to answer. Save the question for when legal is present.",
          keywords: ["what prompted", "what basis", "why are you here", "what they know", "directed to relevant", "ask what she knows"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am just asking informally while we wait.",
        principle: "Informal does not mean off the record. Politely decline substantive conversation until legal arrives. One sentence. Then wait.",
      },
    },
    {
      id: "s3",
      prompt: "Your counsel is here. I have asked to see the data retention schedule and the audit log for the past twenty-four months. Are you prepared to produce those.",
      choices: [
        {
          id: "s3a",
          tag: "Defer the production decision to counsel",
          line:
            "I would like to give my counsel a few minutes to review the examination authority and the specific document requests before we commit to production. We want to make sure we are producing the right documents in the right way.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "That is acceptable. I can give you fifteen minutes.",
          principle:
            "Deferring the production decision to counsel, even with counsel present, is correct. Your counsel needs to review the authority letter and assess whether the request is within scope before you produce anything.",
          keywords: ["defer to counsel", "give counsel time", "review authority", "right documents", "right way", "commit to production"],
        },
        {
          id: "s3b",
          tag: "Produce the documents immediately",
          line:
            "We are prepared to produce those. I will have someone pull them right now.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "Thank you. I will also need the exception logs for any records that were flagged for extended retention.",
          principle:
            "Producing documents before counsel has reviewed the request and scope gives the examiner everything she asked for without confirming it is within the authorized scope. One production invites an expanded request.",
          keywords: ["produce immediately", "right now", "pull them", "prepared to produce", "give them over"],
        },
        {
          id: "s3c",
          tag: "Ask to narrow the scope first",
          line:
            "We want to cooperate fully. Before we pull those records, can we get clarity on whether the twenty-four month window is fixed or whether there is flexibility on the scope.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "The scope is set by the examination authority. I cannot narrow it unilaterally.",
          principle:
            "Asking about scope is legitimate and shows you are taking the examination seriously. It rarely succeeds in narrowing the scope, but it demonstrates you are engaging with the authority rather than producing reflexively.",
          keywords: ["narrow scope", "clarity on scope", "twenty-four months", "flexibility", "fixed scope", "before we pull"],
        },
        {
          id: "s3d",
          tag: "Commit to producing everything she needs",
          line:
            "We have nothing to hide. We will produce whatever you need to see.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "Good. Then I will also need the communications records related to the retention exception decisions.",
          principle:
            "Committing to produce whatever is needed, without scope review or counsel guidance, is a significant overextension. It invites requests beyond the authorized examination scope and waives objections you might otherwise have.",
          keywords: ["nothing to hide", "whatever you need", "produce everything", "cooperate fully", "see anything", "open books"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a commitment on the document production.",
        principle: "Let counsel make the production commitment after reviewing the scope. Your job is to facilitate, not to decide unilaterally what to produce.",
      },
    },
    {
      id: "s4",
      prompt: "Based on what I have seen so far, I have some questions about your retention exception process. Specifically, whether exceptions were documented at the time they were made.",
      choices: [
        {
          id: "s4a",
          tag: "Let the records answer that question",
          line:
            "I want to make sure you get an accurate answer on that. My understanding is that exceptions are documented, but I would rather point you to the records than characterize the process from memory. Can we work through that with the documentation in front of us.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "That is a sensible approach. Walk me through the documentation.",
          principle:
            "Refusing to characterize a process from memory when the documentation exists is both accurate and protective. Memory characterizations of compliance processes become part of the record, and if they differ from the documentation, you have a problem.",
          keywords: ["let the records answer", "documentation in front", "from memory", "accurate answer", "point you to records", "work through documentation"],
        },
        {
          id: "s4b",
          tag: "Confirm the process was followed",
          line:
            "Yes, our process requires documentation at the time of exception. I am confident that is what happened.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "Can you show me the documentation for the exception in November of last year.",
          principle:
            "Confirming compliance from memory before seeing the records is the most dangerous move in a regulatory examination. If the documentation does not match your confirmation, you have made a false statement to a regulator.",
          keywords: ["yes", "confident", "was followed", "confirm process", "that is what happened", "I am certain"],
        },
        {
          id: "s4c",
          tag: "Express concern about the question",
          line:
            "I want to make sure I understand the question correctly before I respond. Are you asking about our stated policy or about specific instances.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "Specific instances. Specifically the exceptions flagged in the system over the past twelve months.",
          principle:
            "Asking for clarification before responding to a specific question is legitimate and shows you are trying to answer accurately. It also buys a moment to assess what the question is actually probing.",
          keywords: ["understand the question", "clarify", "stated policy", "specific instances", "before I respond", "what are you asking"],
        },
        {
          id: "s4d",
          tag: "Say you need to review before answering",
          line:
            "That is a question I want to answer accurately. Before I characterize our exception documentation practices in an examination context, I would like to review the relevant records with my counsel. Can we set a time to go through this after we have had a chance to do that.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "I can give you until tomorrow morning. I will expect a written response to this specific question.",
          principle:
            "Asking for time to review before answering a specific compliance question is the right call. A wrong answer in an examination is worse than a delayed one. Offering a written response converts a verbal exchange into something you can craft accurately.",
          keywords: ["review before answering", "accurately", "relevant records", "with counsel", "written response", "set a time"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need an answer on the documentation question.",
        principle: "Do not characterize compliance processes from memory in a regulatory examination. Point to the records. If you need time to review them, ask for it.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 30 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The examination closes without findings of obstruction. Your counsel tells you afterward that the way you handled the initial arrival bought them time to prepare and likely prevented an off-the-cuff statement from becoming a compliance issue. The examination continues but under structured conditions.",
      lessons: [
        "Request time to get legal present by framing it as ensuring the examination is conducted properly, not as resistance. Examiners expect this and generally honor it.",
        "Informal pre-conversation with a regulator is still on the record. Decline politely and wait.",
        "Do not characterize compliance processes from memory in an examination. Point to the records and let them answer the question.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The examination proceeds but with a note about initial reluctance to cooperate. Your counsel manages the scope but some documents are produced before they could be fully reviewed. The examination findings are pending.",
      lessons: [
        "Asking what prompted the examination is a natural instinct but a tactical error. Save it for when counsel is present.",
        "Producing documents before counsel has reviewed the scope invites expanded requests.",
        "Asking for scope clarity before production rarely narrows the scope but shows you are engaging properly.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Your verbal characterization of the exception process does not match the documentation. The examiner notes the discrepancy. Your counsel is now managing a compliance finding that did not exist before the conversation began.",
      lessons: [
        "Cooperating immediately without legal counsel present turns a manageable examination into an unguided one.",
        "Committing to produce whatever the examiner needs, without scope review, waives objections you might otherwise have.",
        "Confirming compliance from memory before seeing the records is the most dangerous move in a regulatory examination.",
      ],
    },
  ],
};
