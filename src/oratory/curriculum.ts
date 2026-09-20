import type { Lesson } from "./types";

// The oratory class. Ten lessons on making a speech feel like something,
// grouped into what you say, how you build it, and how you say it out loud.

export const LESSONS: Lesson[] = [
  {
    id: "camera",
    unit: "substance",
    title: "The Camera, Not the Caption",
    oneLine: "Emotion lives in what a listener can see. Abstraction is where it goes to die.",
    body: [
      "Most speeches fail before delivery. They fail because the speaker described a category instead of showing a thing. \"Significant workforce disruption\" is a caption. \"Dave, who trained half this room, cleaning out his desk on a Tuesday\" is a camera.",
      "The listener's body does not respond to categories. It responds to pictures. When you say \"thousands were displaced,\" the room nods. When you say \"a woman carrying a door frame on her back,\" the room goes quiet. Same fact, different organ receiving it.",
      "This is why the most emotional speeches often contain the fewest emotional words. You are not trying to tell people how to feel. You are handing them the thing you saw and getting out of the way.",
    ],
    moves: [
      "Replace every abstract noun ending in -tion, -ment, or -ity with the physical event behind it.",
      "Name one person. Use their actual name. A crowd is a statistic; a name is a person.",
      "Add a number only when it is small and specific. Three is more moving than thousands.",
      "Ask of every sentence: could a camera film this? If not, rewrite until it could.",
    ],
    example: {
      flat: "The implementation of the restructuring initiative resulted in considerable hardship for a significant portion of our workforce.",
      charged:
        "We cut forty-one people in March. Dave trained half this room. He packed his desk in a copier-paper box, and nobody could look at him.",
      why: "Nothing was added but detail. The feeling was already in the facts — abstraction was hiding it.",
    },
    drills: [
      {
        id: "camera-write",
        kind: "write",
        title: "Film it",
        brief:
          "Think of a decision at work or at home that hurt someone. In five to eight sentences, tell it with no abstract nouns at all. Name a person. Put an object in their hands. Let the feeling come from what happened, not from words about feeling.",
        targets: ["concrete", "charge", "economy"],
        coachNote:
          "Check your draft for the words impact, situation, challenges, issues, and process. Each one is a place where you flinched away from the thing itself.",
        minWords: 45,
        examples: [
          {
            context: "A layoff you signed off on",
            passage:
              "In March I cut eleven people from a team of forty. Priya found out from a calendar invite that appeared at 7:40 on a Tuesday, fourteen minutes before it started. She had renewed her lease in January because I told her the work was funded. She packed a keyboard, a photo of her daughter, and a jar of instant coffee into a box that still had someone else's name on the side. I walked her to the lobby and neither of us said anything in the lift.",
            notice:
              "Nothing here says difficult or painful. The jar of coffee and the silence in the lift do all of it.",
          },
          {
            context: "A promise you broke at home",
            passage:
              "I told my brother I would be at the hospital by six. I got there at nine because I took a call in the car park and then took another one. He had already spoken to the doctor alone. When I came in he was holding the parking ticket he had bought for me. He put it on the bed and said nothing about it. The ticket had expired at eight.",
            notice:
              "The whole betrayal is a parking ticket on a bed. No adjective could carry it better.",
          },
          {
            context: "Letting someone go in a small business",
            passage:
              "I let Marek go three days before Christmas because the van broke down and I could not pay two wages. He had worked Saturdays all year without once asking me for more. I told him in the yard, standing next to the van, with the bonnet still open. He asked if he could keep the fleece with our name on it. I said yes. He folded it over his arm and walked to the bus stop.",
            notice:
              "The bonnet is still open while it happens. Small physical facts are what make a room believe you.",
          },
          {
            context: "A decision you made as a coach or teacher",
            passage:
              "I cut Amara from the squad on a Thursday. I did it in the corridor between lessons because I had somewhere to be at four and wanted it over with. She had come in at seven every morning since September. She said okay twice, and then asked whether she could keep her kit. Her mother was waiting outside with the engine running.",
            notice:
              "The engine running outside tells you what the walk to the car was like, without describing it.",
          },
        ],
      },
      {
        id: "camera-rewrite",
        kind: "rewrite",
        title: "Strip the captions",
        brief:
          "Rewrite this so a camera could film every sentence. Keep the meaning. Lose the abstractions.",
        source:
          "Following a comprehensive review of our operational efficiency, leadership has determined that a reduction in headcount is necessary. We recognize this creates uncertainty and we are committed to supporting affected individuals throughout the transition process.",
        targets: ["concrete", "economy"],
        coachNote:
          "The original hides the speaker. Notice how much harder it is to write the honest version — that difficulty is the whole point.",
        minWords: 35,
        examples: [
          {
            context: "Say the number and own the list",
            passage:
              "We are letting forty-one people go on the fourteenth. I signed off on the list myself. Some of you will hear it from a calendar invite before you hear it from me, and I am sorry for that. Everyone on that list gets three months and a reference I will write by hand.",
            notice:
              "The original hid the speaker entirely. This one puts a person behind every verb.",
          },
          {
            context: "Admit where the list came from",
            passage:
              "Forty-one of you are losing your jobs next month. I made the list on a Sunday at my kitchen table, and I had four of the names wrong before I had them right. You will get a call before Friday. I will be on the third floor all week if you would rather hear it from me.",
            notice:
              "The kitchen table is the whole difference between a memo and a person talking.",
          },
          {
            context: "Put the cause in front",
            passage:
              "We ran out of money in October and I did not tell you until today. Forty-one people are leaving. I will read every name out myself on Thursday rather than let anyone find their own on a spreadsheet.",
            notice:
              "Shorter than the original and says more, because none of it is hiding.",
          },
        ],
      },
    ],
  },
  {
    id: "image",
    unit: "substance",
    title: "One Image Beats Five Adjectives",
    oneLine: "Adjectives tell the room what to think. An image makes them think it themselves.",
    body: [
      "\"It was a devastating, overwhelming, deeply painful year\" gives the listener three instructions and no experience. \"That year, I learned which stairs in my house creak at 3am\" gives them no instructions and the entire experience.",
      "An image works because the listener has to complete it. They build the dark hallway, the sleeplessness, the reason you were awake. Having built it, they own it. Nobody argues with a picture they assembled themselves.",
      "One is the correct number. Two images compete; three become a list, and a list is a different device with a different job. Find the single picture that carries the whole meaning, put it where the argument turns, and do not decorate it.",
    ],
    moves: [
      "Delete every adverb ending in -ly and see what the sentence still needs. Usually a noun, not a modifier.",
      "Build the image from ordinary objects: a chair, a phone screen, a door. Exotic imagery calls attention to the speaker.",
      "Put the image at the hinge of the argument, not in the opening pleasantries.",
      "Say it once. Do not explain it afterward. Explaining an image kills it.",
    ],
    example: {
      flat: "Our team was extremely exhausted and morale was critically low during that period.",
      charged: "By November, people were eating lunch in their cars.",
      why: "Nine words removed, one picture added. The room supplies the exhaustion — and believes it, because they thought of it.",
    },
    drills: [
      {
        id: "image-write",
        kind: "write",
        title: "The single picture",
        brief:
          "Describe a hard stretch — a project, a season, a relationship — in four to six sentences, using exactly one image and zero adjectives about feeling. No \"difficult,\" no \"exhausting,\" no \"painful.\" Let the picture do all of it.",
        targets: ["concrete", "charge", "economy"],
        coachNote:
          "If you used more than one image, cut the weaker one. Two pictures halve each other.",
        minWords: 35,
        examples: [
          {
            context: "A stretch at work",
            passage:
              "That autumn I learned which step on our staircase creaks at three in the morning, because I was on it most nights between September and December waiting for the kettle. We shipped on the fourteenth of November. On the fifteenth nobody in the building mentioned it. Nobody has since.",
            notice:
              "One picture, then plain facts. The creaking step is the only image and it carries the rest.",
          },
          {
            context: "A team running out",
            passage:
              "By November the team was eating lunch at their desks with the lids still on. Nobody booked the Friday meeting any more. Two people left in December and we did not replace them. I stopped asking how the weekend had gone.",
            notice:
              "Lids still on. Four words, and you can see the whole month.",
          },
          {
            context: "A season at home",
            passage:
              "The spring my father was ill, I drove the same ninety minutes twice a week for four months. He never once asked me to come. He never once said thank you. In April he started leaving the porch light on.",
            notice:
              "The light is the only image, and it arrives last. Notice it is never explained.",
          },
        ],
      },
    ],
  },
  {
    id: "stakes",
    unit: "substance",
    title: "Say What It Cost You",
    oneLine: "Earned emotion comes from admitted cost. Performed emotion comes from volume.",
    body: [
      "There is a reason audiences forgive a shaky voice and never forgive a rehearsed tremor. Emotion registers as real when it is attached to something the speaker stands to lose by saying it. Without that, intensity reads as technique, and technique in the emotional register reads as manipulation.",
      "The admission does not need to be dramatic. \"I argued against this for six months and I was wrong\" costs something. \"We're all on a journey of growth\" costs nothing, which is exactly how it sounds.",
      "Be precise about the risk you are taking. Vague vulnerability — \"I'll be honest, this is hard for me\" — is a performance of exposure with no exposure in it. Name the specific thing you would rather not say, and then say that thing.",
    ],
    moves: [
      "Ask: what is the sentence I am hoping nobody asks me about? Lead with it.",
      "Admit the cost before you make the ask. Order matters; the ask is cheap once the cost is on the table.",
      "Use \"I was wrong about\" with a specific object, never \"mistakes were made.\"",
      "Do not apologize for the emotion. Announcing it (\"forgive me, this is emotional\") transfers the discomfort to the room.",
    ],
    example: {
      flat: "I want to acknowledge that this has been a challenging transition for everyone involved.",
      charged:
        "I pushed for this reorg. Three of you told me it would break the on-call rotation, and I told you it wouldn't. You were right, and it cost Priya her weekends for four months.",
      why: "The speaker loses something by saying it. That loss is what makes the room believe the rest of the speech.",
    },
    drills: [
      {
        id: "stakes-write",
        kind: "write",
        title: "The costly sentence",
        brief:
          "Write the opening of a talk where you admit something you got wrong — to a team, a client, a family member. Six to ten sentences. Name what you believed, who told you otherwise, and what it cost. No hedging verbs: no \"perhaps,\" \"somewhat,\" \"a bit.\"",
        targets: ["charge", "economy", "concrete"],
        coachNote:
          "Reread it looking for the word \"we\" where the honest word is \"I.\" Diffusing blame across a group is the most common way to un-earn an admission.",
        minWords: 55,
        examples: [
          {
            context: "A decision you argued for and got wrong",
            passage:
              "I pushed this reorg through in January. Two people told me it would break the on-call rota and I told them they were being territorial. They were not being territorial. They were right. Priya covered eleven weekends between February and June. She asked me twice for help and both times I said it would settle down. It did not settle down. She resigned on a Monday and I found out from her calendar.",
            notice:
              "Every sentence costs the speaker something. That is what makes the last one land instead of sounding like a script.",
          },
          {
            context: "A promise at home",
            passage:
              "I promised I would be at both games and I went to neither. I told myself it was the quarter close, and the quarter close was real, but I have been to four leaving drinks since September and none of his matches. He stopped asking whether I was coming in the third week of October. I only noticed in December.",
            notice:
              "The admission is precise: not I have been busy, but four leaving drinks and no matches.",
          },
          {
            context: "A number you got wrong",
            passage:
              "I priced the job at nine thousand because I wanted to win it. It cost eleven. I paid the difference out of the money set aside for Marek's van, and then I told Marek the van would have to wait another year. He did not complain. He has not asked about the van since March, and the silence is worse than complaining would have been.",
            notice:
              "Admitted cost, in pounds and in somebody else's year. No apology anywhere in it.",
          },
        ],
      },
      {
        id: "stakes-speak",
        kind: "speak",
        title: "Say it out loud",
        brief:
          "Deliver the passage you just wrote — or any admission of your own — out loud. Slow down. The instinct with a costly sentence is to rush past it; do the opposite and let it sit.",
        targets: ["breath", "rhythm"],
        coachNote:
          "Aim under 130 words a minute and leave a real pause after the admission. Speed on a hard sentence reads as wanting to be finished with it.",
        minWords: 30,
      },
    ],
  },

  {
    id: "rhythm",
    unit: "shape",
    title: "Long, Long, Short",
    oneLine: "A short sentence after two long ones hits like a dropped glass.",
    body: [
      "Prose that is all long sentences becomes weather — continuous, ignorable. Prose that is all short sentences becomes a drumroll with no cymbal. Force comes from the change between them.",
      "The pattern that works almost everywhere: build across two longer sentences, accumulating detail and clauses, then land on something of four words or fewer. The long sentences make the room lean in. The short one arrives in the silence they created.",
      "You can hear this in every speech you remember. The construction is doing the emotional work; the vocabulary is often plain. Measure your own draft — if your sentences are all between twelve and twenty words, you have written a report, whatever the subject.",
    ],
    moves: [
      "Count the words in each sentence and write the numbers in the margin. Look for variance, not average.",
      "Find your most important sentence and cut it to five words or fewer.",
      "Never follow a short punch with another short punch. Let it stand alone.",
      "Read aloud and mark where you naturally breathe. If you never breathe, the audience never does either.",
    ],
    example: {
      flat: "We reviewed the numbers carefully and concluded that the current strategy is not delivering the returns we projected, so we have decided to make a change in direction going forward.",
      charged:
        "We spent three weeks going through every line of the forecast, hunting for the assumption that would make it work. We tested nine of them. None of them held. We were wrong.",
      why: "Same information. The rhythm turns a conclusion into a verdict.",
    },
    drills: [
      {
        id: "rhythm-rewrite",
        kind: "rewrite",
        title: "Break the monotone",
        brief:
          "Every sentence here is roughly the same length. Rewrite it so the lengths vary sharply and it ends on something short and hard.",
        source:
          "We have been working on this problem for a number of months now and have tried several different approaches. The results have consistently fallen short of what we had originally hoped to achieve. We believe a fundamentally different approach is required at this point in time.",
        targets: ["rhythm", "breath", "economy"],
        coachNote:
          "The target shape is something like 24 words, 18 words, 3 words. Write the numbers down and check yourself.",
        minWords: 30,
        examples: [
          {
            context: "Build across two, land on three words",
            passage:
              "For seven months we have thrown everything we have at this: three rewrites, two consultants, and a room upstairs that ran until nine most nights. We tried every version of the plan any of us could think of. None of it moved the number. We were wrong.",
            notice:
              "Roughly 30, 14, 6, 3 words. Write the lengths in the margin and you can see the shape.",
          },
          {
            context: "Same shape, plainer words",
            passage:
              "We have spent since February trying five different fixes, and the last of them shipped in August with exactly the result the first one had. Nothing has moved. We need a different idea.",
            notice:
              "The long sentence carries the evidence so the short ones can carry the verdict.",
          },
          {
            context: "Open with the tally",
            passage:
              "Eleven months, four approaches, two teams, and a graph that has not moved a millimetre since the spring. We keep shipping variations of the same idea and calling them new. The idea is wrong.",
            notice:
              "A list can do the building, so long as something short arrives after it.",
          },
        ],
      },
      {
        id: "rhythm-write",
        kind: "write",
        title: "Build and drop",
        brief:
          "Make the case for a decision you actually believe in. Five to eight sentences. At least one sentence over twenty words, at least one under five, and they must not be adjacent.",
        targets: ["rhythm", "breath"],
        coachNote:
          "Variance is the score here, not brevity. A passage of all-short sentences scores no better than a passage of all-long ones.",
        minWords: 45,
        examples: [
          {
            context: "Making a case at work",
            passage:
              "We should stop chasing enterprise, and spend the next year on the three hundred small shops who already pay us, renew without a phone call, and tell each other about us for free. Enterprise took eleven months and two discounts to close. The shops take a week. Our best quarter came from one shop owner in Leeds who told six other shop owners. Stop chasing logos.",
            notice:
              "The 38-word opener earns the three-word ending, and they are nowhere near each other.",
          },
          {
            context: "A decision at home",
            passage:
              "I want to sell the car. Between the road tax, the two hundred a month to keep it outside a house we both leave on foot, and the four times we drove it last year, it is a room we rent for nothing. We would walk more. We would argue about parking less. It goes.",
            notice:
              "Two short sentences in the middle give the room somewhere to breathe before the drop.",
          },
          {
            context: "A case to a committee",
            passage:
              "Every objection raised last night came down to one worry, that a bus every twenty minutes brings people through the village who have no reason to stop in it. Those people already drive through, at fifty, past the school gate. They do not see us. A bus would.",
            notice:
              "Long, then three short lines of decreasing length. The last one is three words and it is the argument.",
          },
        ],
      },
    ],
  },
  {
    id: "drumbeat",
    unit: "shape",
    title: "The Drumbeat",
    oneLine: "Repeat the opening words and the room starts to expect you. Expectation is momentum.",
    body: [
      "Anaphora — beginning consecutive sentences with the same words — is the oldest device in the toolkit because it does something no other construction does. The first repetition registers as coincidence. The second as pattern. By the third, the room is ahead of you, and a room that is ahead of you is a room that is with you.",
      "It works on the same principle as a chorus. The repeated phrase becomes a fixed point, and each new ending lands against it. \"We were told it couldn't be funded. We were told it couldn't be staffed. We were told to wait.\" The repetition is a floor; the variation is what you build on it.",
      "The opposite placement, epistrophe, repeats at the end instead, and lands heavier and sadder: it makes each sentence arrive at the same unavoidable place. Use anaphora to build. Use epistrophe to close a door.",
      "Three repetitions is the working number. Two is a stutter. Five is a chant, and unless you have the room's full permission, a chant is where sincerity tips into theater.",
    ],
    moves: [
      "Pick the phrase for its plainness. \"We were told,\" \"Not one,\" \"I know what it is to\" — ordinary words repeated carry more than clever ones.",
      "Vary the length of what follows the repeated phrase. Same opening, different landing.",
      "Make the third one the shortest. The pattern is established; now break it.",
      "Do not repeat a phrase you have not earned. Three sentences of anaphora over a thin point makes the point sound thinner.",
    ],
    example: {
      flat: "There were multiple obstacles: funding was denied, hiring was frozen, and we were repeatedly asked to postpone.",
      charged:
        "They told us there was no budget. They told us there were no people. They told us to wait.",
      why: "The list version distributes the pressure. The drumbeat version stacks it, and the last line arrives on a floor you already built.",
    },
    drills: [
      {
        id: "drumbeat-write",
        kind: "write",
        title: "Three on the same phrase",
        brief:
          "Write a passage that uses one repeated opening phrase across three consecutive sentences, then breaks the pattern with a fourth sentence that does not use it. Subject: something you were refused, or something you refuse to accept.",
        targets: ["device", "rhythm", "charge"],
        coachNote:
          "The fourth sentence is where the drill is won. The repetition sets an expectation only so that breaking it means something.",
        minWords: 40,
        examples: [
          {
            context: "What you were refused",
            passage:
              "They told us there was no money for it. They told us there were no people for it. They told us to wait until January and ask again. We built it anyway, on a kitchen table, with two of us and a borrowed laptop.",
            notice:
              "The third repetition is the shortest, and the fourth line does not use the phrase at all.",
          },
          {
            context: "Earning the right to object",
            passage:
              "I have sat in that chair. I have made that exact call. I have been wrong about it in exactly the way you are about to be. So when I tell you this will not work, I am not guessing.",
            notice:
              "Repetition here is not decoration, it is credentials. Each one buys the last sentence more weight.",
          },
          {
            context: "How something was allowed to happen",
            passage:
              "Nobody wrote it down in October. Nobody asked who owned it in November. Nobody said no in December, and by January it had a budget line and two contractors on it. That is how we got here. It cost us eleven months, and not one person chose it.",
            notice:
              "Twenty words in total. The drumbeat does not need length, it needs the same opening three times.",
          },
        ],
      },
      {
        id: "drumbeat-speak",
        kind: "speak",
        title: "Deliver the drumbeat",
        brief:
          "Say your anaphora passage out loud. Each repetition should be slightly slower and slightly lower than the one before it. Do not get louder — get heavier.",
        targets: ["breath", "rhythm"],
        coachNote:
          "Rising volume on repetition reads as hectoring. Falling pace on repetition reads as conviction.",
        minWords: 25,
      },
    ],
  },
  {
    id: "three",
    unit: "shape",
    title: "Three, and the Heaviest Last",
    oneLine: "Two items is a pair. Four is a list. Three is a shape the ear recognizes as complete.",
    body: [
      "The tricolon is the most reliable rhythmic unit in speech. Something in the ear treats two as unfinished and four as arbitrary, while three closes. Blood, sweat, and tears. Of the people, by the people, for the people. It is not a coincidence that these survive.",
      "The mechanism is order. Put the items in increasing weight — shortest and lightest first, longest and heaviest last — and the sequence itself produces a sense of arrival. Reverse the order and the same three items deflate.",
      "The third item is where you can also break the pattern deliberately: two short and one long, or two literal and one unexpected. That asymmetry is what stops a tricolon from sounding like a formula.",
    ],
    moves: [
      "Order by syllable count, ascending. Your ear already knows this; the rule just makes it conscious.",
      "Make the third item the one you actually mean. The first two buy attention for it.",
      "Do not use two tricolons close together — the second one exposes the device.",
      "Cut a fourth item even when it is true. Truth is not the criterion here; shape is.",
    ],
    example: {
      flat: "This will require additional budget, significant restructuring of the team, honesty about our past claims, and more time.",
      charged: "It will cost money. It will cost time. It will cost us the story we have been telling about ourselves.",
      why: "Four items became three, ordered by weight. The last one is the real subject, and it arrives on a platform the first two built.",
    },
    drills: [
      {
        id: "three-rewrite",
        kind: "rewrite",
        title: "Cut to three",
        brief:
          "This has five items in flat order. Cut to three, put them in ascending weight, and make the last one the thing that matters.",
        source:
          "Getting this right will take better tooling, some process changes, more headcount, clearer documentation, and a willingness to admit that the original design was wrong.",
        targets: ["device", "rhythm", "economy"],
        coachNote:
          "Notice which item you kept last. If it is not the one that costs the most to say, you cut the wrong ones.",
        minWords: 25,
        examples: [
          {
            context: "Ordered by what it costs to say",
            passage:
              "I will not pretend this is cheap. Getting it right takes sharper tools, four more people, and saying out loud that the design we sold you was drawn by me and it was wrong. That last one is free. It is also the hard one.",
            notice:
              "Tools, people, admission. Each item is heavier than the one before, and the last one is the real subject.",
          },
          {
            context: "The same three as a drumbeat",
            passage:
              "It will cost us money. It will cost us most of a year. It will cost us the story we have been telling ourselves since the launch in March. I would still sign it today.",
            notice:
              "Three sentences instead of one list. Same order, more room, and the last one is twice the length of the first.",
          },
          {
            context: "Plain and short",
            passage:
              "We need sharper tools, four more people on the floor, and somebody willing to say the first drawing was wrong. Two of those I can buy this month. The third one is mine. I have been avoiding it since March.",
            notice:
              "Notice what happens after the three: the list sets up a line that would mean nothing on its own.",
          },
        ],
      },
    ],
  },
  {
    id: "turn",
    unit: "shape",
    title: "The Turn",
    oneLine: "Not this — that. Contrast is the fastest way to make a room feel a difference.",
    body: [
      "Antithesis puts two things in the same grammatical frame so the gap between them becomes visible. \"Ask not what your country can do for you; ask what you can do for your country.\" The frame is identical; only the direction reverses, and the reversal is the whole argument.",
      "The device is doing something practical: it pre-empts the idea the audience already has and replaces it in a single move. \"This is not a cost problem. It is a trust problem.\" You have named their assumption, discarded it, and installed yours, in eleven words.",
      "The frame must be tight for the turn to work. If the two halves have different shapes, the ear hears two statements rather than one pivot. Match the structure, change one thing, and let the symmetry do the persuading.",
    ],
    moves: [
      "Use the negative half first. Killing the wrong idea clears space for the right one.",
      "Keep both halves the same length, or make the second slightly shorter for emphasis.",
      "Change one word, not four. The more the halves match, the harder the turn lands.",
      "One turn per passage. Repeated antithesis becomes a rhetorical tic that audiences notice and distrust.",
    ],
    example: {
      flat: "I think people are misinterpreting the reasons behind the delay; it's less about the resources and more about a lack of alignment between the teams.",
      charged: "We are not behind because we lack people. We are behind because we do not agree.",
      why: "Two matched frames, one reversal. The hedging (\"I think,\" \"less about,\" \"more about\") disappears because the structure carries the claim.",
    },
    drills: [
      {
        id: "turn-write",
        kind: "write",
        title: "Kill the assumption",
        brief:
          "Name the thing your audience wrongly believes about a situation you know well, then turn it. Four to seven sentences, containing exactly one antithesis in matched frames. Build to it; do not open with it.",
        targets: ["device", "economy", "rhythm"],
        coachNote:
          "Read your turn aloud. If the two halves do not have nearly the same rhythm, tighten the second until they do.",
        minWords: 40,
        examples: [
          {
            context: "Killing the assumption at work",
            passage:
              "Everyone in this room believes we are behind because we are short of people. We hired nine engineers last year, and I signed every one of those offers myself. Four of them are still waiting for somebody to tell them what to build. One asked me in March and I have not answered. We are not behind because we lack people. We are behind because we do not agree.",
            notice:
              "The turn arrives last, after the evidence. Both halves use the same eight-word frame.",
          },
          {
            context: "A pricing argument",
            passage:
              "You have been told this is a pricing problem. We dropped the price twice in eighteen months. Both times the same customers left in the same month, and they left for a product that costs more than ours. This is not a price problem. It is a trust problem.",
            notice:
              "Two matched frames, one word changed. The hedging disappears because the structure carries the claim.",
          },
          {
            context: "A community meeting",
            passage:
              "The council keeps calling this a parking issue. Nobody at last month's meeting mentioned a car. They talked about the bus that stopped in April, and the walk to the surgery, and Mrs Doyle waiting forty minutes in the rain with her shopping. This is not about where we leave our cars. It is about how we reach a doctor.",
            notice:
              "Build, then turn. The second half is shorter than the first, which is what makes it land.",
          },
        ],
      },
    ],
  },

  {
    id: "pause",
    unit: "delivery",
    title: "Silence Is a Word",
    oneLine: "The pause before a sentence is what tells the room the sentence matters.",
    body: [
      "Nervous speakers fill every gap, because silence in front of an audience feels like failure in progress. It is the opposite. A held pause is the only tool that makes a room lean forward, and it is free.",
      "The mechanics are specific. A pause after a sentence lets meaning settle. A pause before a phrase creates expectation and makes the phrase land harder. The second is stronger and almost nobody uses it, because stopping mid-thought takes nerve.",
      "Two seconds feels like a collapse from the stage and reads as composure from the seats. This gap between how it feels and how it looks is the single biggest difference between how amateurs and professionals sound, and closing it is purely a matter of tolerating discomfort.",
      "Filler — um, uh, you know, so, basically, right? — is a pause you were too anxious to take. The cure is not speaking faster. It is deciding in advance that silence is acceptable.",
    ],
    moves: [
      "Mark two pauses in your script before you deliver it. Actually write the slashes in.",
      "Pause before the most important noun in the speech, not after it.",
      "When you lose your place, stop and say nothing. The room reads it as deliberation.",
      "Count internally: one, two. Then continue. It will feel far too long. It is not.",
    ],
    example: {
      flat: "So, um, I think what we really need to do here is basically rebuild the whole thing from scratch, you know?",
      charged: "What we need to do — [two seconds] — is start over.",
      why: "The filler was carrying the speaker's anxiety. The pause carries the meaning instead.",
    },
    drills: [
      {
        id: "pause-speak",
        kind: "speak",
        title: "Hold the silence",
        brief:
          "Deliver this passage out loud. Take a full two-second pause at each dash. Do not fill any gap with um, uh, so, or you know.",
        script:
          "We had one job this quarter — to keep the promise we made in January. We did not keep it. The reason is not complicated — we said yes to three things when we had the people for one. That was my call. Next quarter we are doing one thing. Only one.",
        targets: ["breath", "rhythm"],
        coachNote:
          "The tracker counts your filler words and your pauses. Two long pauses and zero fillers is a clean run at this drill.",
        minWords: 40,
      },
      {
        id: "pause-speak-own",
        kind: "speak",
        title: "Your own words, with air",
        brief:
          "Speak for about a minute on anything you care about, with no script. Every time you feel an um coming, close your mouth instead and wait.",
        targets: ["breath", "rhythm", "economy"],
        coachNote:
          "Under four fillers per minute is conversational. Under one is the level where people describe you as measured.",
        minWords: 60,
      },
    ],
  },
  {
    id: "dynamics",
    unit: "delivery",
    title: "Volume Is Punctuation",
    oneLine: "Getting quieter is a stronger move than getting louder, and almost nobody does it.",
    body: [
      "Untrained speakers have two settings: normal and louder-for-the-important-part. The room habituates to loud within about ten seconds, and after that the loud parts carry no more weight than the rest — they are just tiring.",
      "Dropping volume does the opposite. A room physically works harder to hear a quiet line, and effort spent listening becomes attention. The most devastating deliveries of hard news are almost always quieter than the sentences around them.",
      "Pace is the same lever in a different direction. Slow is not solemn by itself; slow after fast is. Build a stretch of speech at pace, then halve the speed for one sentence, and that sentence is the one they repeat afterward.",
      "The practical target is range, not level. A delivery that stays within a narrow band — of volume, pitch, or speed — reads as a monotone no matter how good the words are.",
    ],
    moves: [
      "Pick the single most important sentence and deliver it quieter than everything around it.",
      "Vary pace by section: fast through context, slow through consequence.",
      "Drop pitch at the end of statements. Rising pitch turns a claim into a request for approval.",
      "Land on a consonant and stop. Trailing off on a vowel is what makes an ending sound unsure.",
    ],
    example: {
      flat: "AND THAT IS WHY THIS MATTERS SO MUCH TO ALL OF US HERE TODAY!",
      charged: "[quieter, slower] And that is why I am not going to pretend this is fine.",
      why: "Volume announces importance. Restraint demonstrates it. The room supplies the intensity you left out.",
    },
    drills: [
      {
        id: "dynamics-speak",
        kind: "speak",
        title: "Find your range",
        brief:
          "Deliver this passage out loud. Start at normal volume, then drop — quieter and slower — for the final two sentences. The trainer measures whether your delivery actually has a range or only sounds like it does.",
        script:
          "For two years we told this team that the rewrite would make everything easier. We shipped it in April. Support tickets went up forty percent, the on-call rotation doubled, and two of our best engineers left in June. I signed off on all of it. I am not going to pretend this is fine.",
        targets: ["breath", "rhythm"],
        coachNote:
          "A dynamic range under fifteen percent means you spoke in a flat band. The words were varied; the voice was not.",
        minWords: 45,
      },
    ],
  },
  {
    id: "landing",
    unit: "delivery",
    title: "The Last Line",
    oneLine: "Audiences remember the ending with disproportionate weight. Most speakers waste it on logistics.",
    body: [
      "The final sentence of a talk occupies more memory than the middle five minutes combined, and the overwhelming majority of speakers spend it on \"so, yeah, thanks\" or a slide full of next steps. Whatever the ending is, that is what the speech was about, as far as the room is concerned.",
      "A landing has three properties. It is short. It is concrete. And it does not summarize — it commits. Summaries close a topic; commitments leave the room holding something.",
      "The strongest endings return to the image or phrase you planted earlier. The audience recognizes it, and recognition feels like resolution even when nothing was resolved. Plant it in the first minute, let it disappear, bring it back at the end and stop.",
      "Then stop. Not \"thank you, and I'm happy to take questions, and again thanks to everyone who.\" Land, and be silent. Let them be the ones who move first.",
    ],
    moves: [
      "Write the last line first. Build backward toward it.",
      "Keep it under ten words, and make the final word a heavy one — a noun or a verb, never an adverb.",
      "Call back to your opening image. Do not explain the callback.",
      "End on a commitment, not a summary: what you will do, not what you covered.",
    ],
    example: {
      flat: "So that's basically an overview of where we are and the various next steps we've outlined, and I want to thank everyone for their hard work this quarter, thank you.",
      charged: "Next quarter, we do one thing. I will not ask you for a second one.",
      why: "Short, concrete, a commitment rather than a recap — and it ends on a word with weight instead of trailing into gratitude.",
    },
    drills: [
      {
        id: "landing-write",
        kind: "write",
        title: "Write the ending first",
        brief:
          "Write the last forty to eighty words of a talk. It must plant nothing new, end on a sentence under ten words, and commit to something rather than summarize. No thanks, no next steps, no \"in conclusion.\"",
        targets: ["rhythm", "concrete", "economy"],
        coachNote:
          "Read only your final sentence to someone. If they cannot tell what the speech was about from that one line, it is not a landing.",
        minWords: 40,
        examples: [
          {
            context: "Ending on one commitment",
            passage:
              "So here is what happens next. I am cancelling both of the projects I announced in January, and I am not replacing them with three new ones. Priya's team goes back to a single thing. In six weeks I will stand here and tell you whether it worked, with the numbers on the screen behind me. Next quarter we do one thing. I will not ask you for a second.",
            notice:
              "No thanks, no next steps, no in conclusion. It ends on a promise that costs the speaker something.",
          },
          {
            context: "Taking the worst of it yourself",
            passage:
              "We are not going to talk about culture again this year. On Monday the on-call rota goes to eight people instead of four. I will take a week of it myself, and I am taking the one over Christmas. If it is still broken in March you will hear that from me before you hear it from anybody else. I am taking Christmas.",
            notice:
              "The callback does the closing. The last line repeats something from four sentences earlier and never explains why.",
          },
          {
            context: "Ending an apology",
            passage:
              "I have asked you for a great deal this year and most of it did not work. I am not going to ask you for more time. The deadline moves to June, the scope halves tonight, and I will tell the board myself on Thursday morning. You will not hear it from them first. I own this one.",
            notice:
              "Four words, a heavy last noun, and a commitment rather than a summary of what was covered.",
          },
        ],
      },
      {
        id: "landing-speak",
        kind: "speak",
        title: "Land and stop",
        brief:
          "Deliver your ending out loud. Slow the final sentence. Drop your pitch on the last word. Then stop talking entirely — the tracker keeps listening, and silence at the end is what you want it to hear.",
        targets: ["breath", "rhythm"],
        coachNote:
          "The most common failure is speeding up at the end out of relief. Your last sentence should be your slowest.",
        minWords: 25,
      },
    ],
  },
];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l])
);

export const ALL_DRILLS = LESSONS.flatMap((l) =>
  l.drills.map((d) => ({ ...d, lessonId: l.id }))
);

export function lessonForDrill(drillId: string) {
  return LESSONS.find((l) => l.drills.some((d) => d.id === drillId)) ?? null;
}
