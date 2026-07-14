import type { Encounter } from "../../game/types";

export const journalistCall: Encounter = {
  id: "journalist-call",
  title: "The Call",
  difficulty: "adversarial",
  opponent: {
    name: "The Reporter",
    role: "A journalist publishing a story tomorrow about alleged data handling issues",
    archetype: "External Counterpart",
    blurb: "She is calling to give you a comment window before publication. She has some real facts, some wrong ones, and twenty minutes. Everything you say can appear in the story.",
  },
  scene:
    "A reporter from a business publication calls. She says she is publishing a story tomorrow about alleged data handling issues at your company and is giving you a comment window. You have not reached legal yet. Your PR lead is on another call. You have twenty minutes.",
  objective:
    "Get the facts of what she knows, protect the company from confirmations you cannot make, and buy time without saying anything that becomes the story.",
  startStanding: 35,
  startMomentum: 16,
  stages: [
    {
      id: "s1",
      prompt:
        "I am calling because we are publishing a piece tomorrow about data handling practices at your company. I want to give you the opportunity to comment before it runs.",
      choices: [
        {
          id: "s1a",
          tag: "Get the facts first",
          line:
            "I appreciate you calling. Before I can comment meaningfully, I need to understand what you are specifically reporting. Can you tell me what the piece says so I can give you an accurate response.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "We are reporting that your company retained user data beyond the stated deletion window in your privacy policy.",
          principle:
            "Asking what the piece says before commenting is not evasion, it is the only way to give an accurate response. You cannot confirm or deny something you have not heard described precisely.",
          keywords: ["understand specifically", "what the piece says", "accurate response", "before I comment", "facts first", "what are you reporting"],
        },
        {
          id: "s1b",
          tag: "Say no comment",
          line:
            "We do not have a comment at this time.",
          points: -3,
          standing: -12,
          momentum: -5,
          reaction:
            "I will note that the company declined to comment. Is there anything else you want on record before I publish.",
          principle:
            "No comment is itself a story beat. It confirms there is something to not comment on. The right move is to understand what she knows before deciding what to say.",
          keywords: ["no comment", "decline", "not at this time", "nothing to say"],
        },
        {
          id: "s1c",
          tag: "Deny the premise",
          line:
            "I can tell you that our data handling practices are fully compliant with all applicable regulations.",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction:
            "Can you confirm that no user data was retained beyond the deletion window described in your privacy policy.",
          principle:
            "A general compliance claim in response to a specific allegation you have not yet heard reads as a non-answer and invites a more specific follow-up question you may not be able to answer.",
          keywords: ["fully compliant", "regulations", "deny", "compliant", "data practices"],
        },
        {
          id: "s1d",
          tag: "Buy time professionally",
          line:
            "I want to make sure you have accurate information. I need fifteen minutes to reach the right people internally. Can I call you back.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "I have a hard deadline. I can give you ten minutes.",
          principle:
            "Asking for time to get accurate information is a legitimate journalistic courtesy and she knows it. The key is naming why you need it, which is accuracy, not avoidance.",
          keywords: ["accurate information", "right people", "call you back", "fifteen minutes", "buy time", "deadline"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something from you before I publish.",
        principle: "Ask what she is specifically reporting before you respond to anything. You cannot confirm or deny what you have not heard.",
      },
    },
    {
      id: "s2",
      prompt:
        "We have documentation showing user data was retained for up to ninety days past the deletion window. We also have a source inside the company who confirmed this was known.",
      choices: [
        {
          id: "s2a",
          tag: "Neither confirm nor deny",
          line:
            "I am not in a position to confirm or deny those specific claims without reviewing the documentation you are describing. What I can tell you is that if there are issues with our data practices, we take that seriously and investigate.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "Would you be willing to review the documentation I have and respond to it specifically.",
          principle:
            "Not confirming or denying specific claims you have not reviewed is legally correct and journalistically reasonable. Offering to review the documentation converts the call from a confrontation into an exchange.",
          keywords: ["not in position", "confirm or deny", "reviewing", "documentation", "take seriously", "investigate"],
        },
        {
          id: "s2b",
          tag: "Confirm what she says is accurate",
          line:
            "That description matches what I understand to be the situation.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "So you are confirming that user data was retained beyond the deletion window.",
          principle:
            "Confirming the specific claim, even loosely, without legal present and without reviewing the documentation is the kind of statement that becomes the headline. You have no basis to confirm it in this moment.",
          keywords: ["confirm", "matches", "accurate", "that is correct", "yes", "agree"],
        },
        {
          id: "s2c",
          tag: "Challenge the source",
          line:
            "A source inside the company raises questions about what that person actually had access to. Can you tell me more about who that is.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction:
            "I do not reveal sources. But the documentation does not depend on the source.",
          principle:
            "Challenging the source credibility is a distraction from the documentation, which she says stands on its own. It also reads as trying to identify the source, which has its own risks.",
          keywords: ["challenge source", "who is the source", "access", "credibility", "reveal sources"],
        },
        {
          id: "s2d",
          tag: "Ask to see the documentation",
          line:
            "I want to respond accurately to what you are describing and I cannot do that without seeing the documentation. Can you share it with me before I comment.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "I can share the relevant excerpts. But I need your response within the hour.",
          principle:
            "Asking to see the documentation before commenting is reasonable and professional. It signals you are taking the claim seriously, not dodging it.",
          keywords: ["see documentation", "share it", "before I comment", "respond accurately", "show me", "documentation"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a response on the retention window claim specifically.",
        principle: "Do not confirm or deny specific claims you have not reviewed. Ask to see the documentation. That is the only accurate basis for a response.",
      },
    },
    {
      id: "s3",
      prompt:
        "Let me ask you directly: were you aware of the data retention issue before this call.",
      choices: [
        {
          id: "s3a",
          tag: "Name what you can say accurately",
          line:
            "I am aware that data handling is an active area of review at our company. Beyond that, I am not in a position to characterize what was or was not known by whom without proper review. That answer may not satisfy you but it is accurate.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "I will note that the company says data handling is an active area of review.",
          principle:
            "Saying data handling is under active review is true, non-committal, and gives her something to report that is actually a positive signal. It is better than silence and better than a denial you might not be able to sustain.",
          keywords: ["active review", "not in position", "characterize", "proper review", "accurate", "aware of"],
        },
        {
          id: "s3b",
          tag: "Say no",
          line:
            "No, I was not aware of this issue before your call.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "Your internal source says the issue was known for several months. Are you saying the source is wrong.",
          principle:
            "Denying awareness without knowing what the source knows sets you up for a contradiction. If the source has documentation, your denial becomes the story.",
          keywords: ["no", "not aware", "deny awareness", "did not know", "first hearing"],
        },
        {
          id: "s3c",
          tag: "Say yes",
          line:
            "Yes, we were aware of some data retention questions that we were working through.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "So the company knew about the issue and did not disclose it to users.",
          principle:
            "Confirming prior awareness without knowing the exact scope of what the source has shared hands her the 'knew and did not act' frame. You have just made the story worse.",
          keywords: ["yes aware", "were aware", "working through", "knew about it", "admit awareness"],
        },
        {
          id: "s3d",
          tag: "Redirect to the comment process",
          line:
            "That is a question I am going to have to get you an accurate answer to after I speak with the right people. I can have a formal statement to you within the hour. What is the best way to reach you.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "One hour. I will be at this number.",
          principle:
            "Redirecting to a formal statement when asked a question you cannot answer accurately is not evasion, it is the correct process. An inaccurate answer is worse than a delayed one.",
          keywords: ["formal statement", "accurate answer", "speak with right people", "within the hour", "redirect", "best way to reach"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something on the awareness question specifically.",
        principle: "Do not answer the awareness question without knowing what the source has. Redirect to a formal statement you can prepare accurately.",
      },
    },
    {
      id: "s4",
      prompt:
        "We are publishing tomorrow regardless. Do you have a final comment you want on record.",
      choices: [
        {
          id: "s4a",
          tag: "Give a statement that is defensible",
          line:
            "Our company takes user privacy seriously and we are committed to operating in accordance with our stated policies. Where we identify gaps, we address them. We are not able to comment on the specific claims in this piece without reviewing them, and we have requested the documentation.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "I will include that. Thank you for your time.",
          principle:
            "A statement that is true, non-confirming, and references your request to review documentation is the best achievable outcome in this situation. It gives her something to quote that does not become a liability.",
          keywords: ["takes seriously", "committed", "stated policies", "address gaps", "not able to comment", "requested documentation", "defensible"],
        },
        {
          id: "s4b",
          tag: "Ask her to delay publication",
          line:
            "I am asking you to give us twenty-four hours to review the documentation and provide a full response. Publishing without that is not accurate reporting.",
          points: 1,
          standing: -2,
          momentum: 3,
          reaction:
            "I understand your position. My deadline does not change. What is your on-record comment.",
          principle:
            "Asking for a delay is worth trying but has low probability of success at this stage. Have your defensible statement ready for when she says no.",
          keywords: ["delay", "twenty-four hours", "full response", "accurate reporting", "more time"],
        },
        {
          id: "s4c",
          tag: "Go off record",
          line:
            "Off the record, here is what I can tell you about the situation.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "I am not able to agree to an off-record conversation at this stage of the story.",
          principle:
            "Attempting to go off the record at the end of a comment window, when you have not yet established that relationship, is a significant error. It is also the moment most likely to appear on record.",
          keywords: ["off the record", "not for publication", "background", "off record"],
        },
        {
          id: "s4d",
          tag: "Say you have no comment",
          line:
            "We have no comment.",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction:
            "Noted. The company declined to comment.",
          principle:
            "No comment at the final question, after a full conversation, reads as the company having nothing defensible to say. A short statement is always better than silence when you had the opportunity.",
          keywords: ["no comment", "decline", "nothing to say"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something from you or I will note you declined.",
        principle: "Give a defensible statement. Something true, non-confirming, and process-oriented. It is always better than no comment.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 38 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The story runs, but your statement is quoted in full and reads as measured. Your legal team tells you you did not make anything worse. The story does not have a quote that becomes the headline.",
      lessons: [
        "Ask what the piece says before you say anything. You cannot confirm or deny what you have not heard precisely.",
        "Do not confirm or deny specific claims without reviewing the documentation. Ask to see it. That is the only basis for an accurate response.",
        "Give a defensible final statement. Something true, non-confirming, and process-oriented is always better than no comment when you had the opportunity.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The story runs and your comment is included but is vague. Legal says you did not create new liability but you missed the opportunity to frame anything constructively.",
      lessons: [
        "Asking for time to get accurate information is a legitimate journalistic courtesy. Use it.",
        "Saying data handling is under active review gives her something true to report that reads as a positive signal.",
        "The final statement is your only controlled output in a story you cannot stop. Write it deliberately.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The story quotes you confirming the issue or your denial is directly contradicted by the documentation. Legal calls before the piece is published.",
      lessons: [
        "No comment is itself a story beat. It confirms there is something to not comment on.",
        "Confirming a specific claim without reviewing the documentation is the statement that becomes the headline.",
        "Going off the record at the end of a comment window, without a prior relationship, is unlikely to be honored.",
      ],
    },
  ],
};
