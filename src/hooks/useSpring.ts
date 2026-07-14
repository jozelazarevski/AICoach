import { useEffect, useRef, useState } from "react";

const STIFFNESS = 160;
const DAMPING = 0.82; // slightly underdamped for a subtle spring overshoot

export function useSpring(target: number): number {
  const [value, setValue] = useState(target);
  const posRef = useRef(target);
  const velRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const step = () => {
      const pos = posRef.current;
      const vel = velRef.current;
      const force = (target - pos) * STIFFNESS * 0.001;
      const newVel = (vel + force) * DAMPING;
      const newPos = pos + newVel;
      posRef.current = newPos;
      velRef.current = newVel;

      if (Math.abs(newPos - target) < 0.08 && Math.abs(newVel) < 0.08) {
        posRef.current = target;
        velRef.current = 0;
        setValue(target);
        return;
      }
      setValue(newPos);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return value;
}
