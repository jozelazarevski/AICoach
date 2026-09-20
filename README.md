# AICoach

Two trainers for talking under pressure, in one app.

**Closed Door** — conversation practice. Someone across the table wants
something and so do you: a landlord, a car salesman, your boss, your brother.
Pick what you say next or type your own words, and try to fill Progress before
Respect runs out.

**The Oratory Class** — speaking to a room rather than across a table. Ten
lessons on emotional speech, with drills that score what you write and listen
to how you say it out loud.

Both run entirely in the browser. An Anthropic API key is optional and adds a
live opponent to the conversations and a coach's read to the oratory drills;
without one, everything still works offline.

## Running it

```
npm install
npm run dev      # http://localhost:5173
npm test         # vitest
npm run build    # typecheck + production build
```

## The Oratory Class

### The curriculum

Ten lessons in three units, in `src/oratory/curriculum.ts`:

| Unit | Lessons |
| --- | --- |
| Substance | The Camera Not the Caption · One Image Beats Five Adjectives · Say What It Cost You |
| Shape | Long Long Short · The Drumbeat · Three and the Heaviest Last · The Turn |
| Delivery | Silence Is a Word · Volume Is Punctuation · The Last Line |

Each lesson carries the teaching, a flat/charged example pair, four concrete
moves, and one to two drills. Sixteen drills in total, in three kinds: `write`
(compose from a brief), `rewrite` (fix a supplied flat passage), and `speak`
(deliver it out loud into the microphone).

### What the writing drills measure

`src/oratory/analyze.ts` scores a passage on six dimensions, each 0-100, with
the drill's target dimensions weighted more heavily in the total:

- **Concreteness** — abstraction suffixes and stock corporate nouns against
  concrete nouns, numbers and names.
- **Rhythm** — standard deviation of sentence length, whether there is a short
  sentence to land on, and whether it sits against a long one.
- **Devices** — anaphora, epistrophe, three-part lists, antithesis, rhetorical
  questions, imagery, direct address.
- **Emotional charge** — words with temperature, minus emotion that is
  announced ("devastating", "incredibly proud") rather than shown.
- **Economy** — hedges, filler, intensifiers, `-ly` padding, clichés, passive
  voice.
- **Breath** — longest run of words with no punctuation to breathe on, and
  whether any sentence is unspeakable in one lungful.

Every finding quotes the span of the passage that caused it. A weak draft can
trip every rule at once, so findings are capped and ordered by the dimensions
that scored worst, weighted toward whatever the current lesson teaches.

### Worked examples

Every writing drill ships three or four worked answers, each from a different
situation, with one line on what to notice in it. They are reachable from the
drill behind a "Stuck on the blank page?" panel, and while the editor is still
empty any of them can be loaded in as a starting point to rewrite.

`examples.test.ts` scores every example with the app's own analyzer and fails
the build if one does not clear the bar the drill is teaching: at least 70
overall against that drill's target dimensions, past its minimum length, and
clean on economy. The device claims are checked too — the drumbeat examples
must actually contain anaphora, the turn examples an antithesis, the rhythm
examples a sharp spread of sentence lengths, the camera examples no
abstractions.

That gate caught more in the analyzer than in the prose. Anaphora and matched
antithesis frames are deliberately parallel, and the rhythm scorer was marking
them down as monotone — penalizing a writer for doing exactly what the lesson
asked. Scoring now recognizes deliberate parallelism and leaves it alone.
Anaphora needs three consecutive sentences rather than two, as the lesson
itself says ("two is a stutter"), which also stops an accidental echo excusing
a real monotone; single-word anaphora ("Nobody… Nobody… Nobody…") is detected,
excluding articles; the turn is recognized in its commonest form, "This is not
X. It is Y.", which the trainer's own scaffold builds and the detector
previously missed; and the concrete and charged vocabularies were too narrow to
reward plain specific writing.

### Which lines are already working

`rankPhrases` scores every sentence against the others in the draft and ranks
them, so a rewrite keeps what is working instead of starting over. Each line
gets its score, its job in the rhythm (builds, lands, flat), tags for what is
carrying it and what is costing it, and a one-line verdict.

Passage-level scoring normalizes per hundred words, which is meaningless on a
six-word sentence — one charged word would read as a rate of sixteen per
hundred and take full marks. Ranking therefore counts occurrences directly and
saturates, so a short line and a long one are judged on what they contain
rather than on their density. Repetition devices credit every line in the run
rather than only the last, and a short sentence counts as the drop only when
the line before it is long enough to make it feel like one.

### Turning a score into the next draft

The report names what is wrong; `src/oratory/rework.ts` turns that into the
next version. It splits strictly in two, and the line between the halves is the
whole design:

**The cuts, applied.** Only edits the machine can make from what the writer
already said — hedges, filler, intensifiers, clichés and adverb padding removed,
the capitalization behind each cut repaired, and any sentence nobody could say
in one breath split at a coordinating conjunction (the one split that cannot
strand a fragment). It shows the reworked text, the score it would now earn, and
every cut struck through with its reason.

**Only you can write these.** Anything that needs a fact becomes a question
rather than an invention. Abstractions come back as "what actually happened,
that you are calling this?", passive spans as "who did it?", and a long final
sentence as a landing to cut to four words. The machine never replaces an
abstraction with a specific it made up.

**Anchors this draft is missing.** Each device the passage lacks becomes a
fill-in-the-blank scaffold seeded from the writer's own material: a drumbeat
built on an opening they already repeat, a turn, a three-part list, a direct
address, and a short line to drop after their longest sentence. Seeds are the
nouns the draft is about, found with two cheap signals standing in for a
part-of-speech tagger — a word following a determiner, and a word carrying a
noun suffix — because raw frequency returns "again", "anyone" and "basically",
none of which can head a list. The three items are ordered by syllable count so
the heaviest lands last. Filling an anchor previews the line, adds it to the
draft, and reopens the editor to score again.

### What the speaking drills measure

`src/oratory/delivery.ts` records through `getUserMedia`, samples loudness from
an `AnalyserNode` at 20 Hz, and splits those samples into room and voice with
Otsu's method — a percentile cannot do it, because how much of a recording is
silence is exactly what varies between a measured delivery and someone talking
without breathing. From that it derives:

- **Pace** — words a minute, against a 105-145 band.
- **Pauses** — every silence over 0.35s, how many were held past a second, and
  the longest.
- **Range** — dB between the loud and quiet parts of your speech. Under about
  5 dB is a monotone whatever the words are doing.
- **Filler** — um, uh, you know, basically, per minute.

Where the browser has one, `SpeechRecognition` supplies the transcript for the
word count and filler counting. Firefox has no recognizer, so pace falls back
to the script's length (and is scored gently, since that number assumes you
read the whole thing) and filler is not counted. Pauses and range come from the
audio and work everywhere.

Nothing is uploaded: audio is analyzed in the page and discarded when the
recording stops.

## The optional coach

With `apiEnabled` on in Settings and a key available, each drill also gets a
qualitative read from Claude — what lands, what costs you, and a rewrite of the
weak part in your own words and facts. The analyzer produces the score and the
model never does, so the student is never handed two numbers that disagree.

The key can come from either end:

- **Server** — set `ANTHROPIC_API_KEY` in the deployment environment. The
  `/api/llm` function proxies calls and the key never reaches the browser.
- **Browser** — paste a key into Settings. It is kept in `localStorage` on that
  device and sent only to Anthropic.

With neither, the coach panel stays closed and the offline analysis carries the
drill on its own.

## Layout

```
src/
  game/        conversation engine, scoring, LLM transport
  content/     the conversation encounters
  oratory/     curriculum, text analyzer, delivery capture, rework engine, coach prompts
  components/  screens for both modes
  hooks/       progress and save state
api/llm.ts     serverless Anthropic proxy
```

Progress for both modes shares one XP pool and rank ladder, saved to
`localStorage` under `closed-door-progress`.
