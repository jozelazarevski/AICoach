let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  gain: number,
  type: OscillatorType = "sine",
  delayMs = 0
) {
  try {
    const audioCtx = getCtx();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = type;
    const start = audioCtx.currentTime + delayMs / 1000;
    osc.frequency.setValueAtTime(freq, start);
    gainNode.gain.setValueAtTime(0, start);
    gainNode.gain.linearRampToValueAtTime(gain, start + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.01);
  } catch {
    // audio not available in this environment
  }
}

export function playVerdict(points: number) {
  if (points >= 5) {
    // Masterstroke: ascending triad
    tone(523, 0.28, 0.13);
    tone(659, 0.24, 0.11, "sine", 60);
    tone(784, 0.2, 0.09, "sine", 120);
  } else if (points >= 3) {
    // Strong: clean double
    tone(440, 0.22, 0.11);
    tone(554, 0.18, 0.08, "sine", 70);
  } else if (points >= 1) {
    // Solid/Flat: single soft tone
    tone(370, 0.18, 0.08);
  } else if (points === 0) {
    // Flat: barely audible tick
    tone(280, 0.1, 0.04);
  } else if (points >= -2) {
    // Misstep: descending sawtooth
    tone(220, 0.28, 0.09, "sawtooth");
    tone(185, 0.22, 0.07, "sawtooth", 80);
  } else {
    // Costly: low dissonant pair
    tone(185, 0.38, 0.1, "sawtooth");
    tone(174, 0.32, 0.08, "sawtooth", 90);
  }
}
