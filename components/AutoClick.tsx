"use client";
import { useEffect } from "react";

interface AutoClickProps {
  targetRef: React.RefObject<HTMLElement>; // Accepts a reference to the target element
}

const AutoClick = ({ targetRef }: AutoClickProps) => {
  useEffect(() => {
    const getRandomTime = () => Math.random() * 2000 + 1000; // Random time between 1s-3s

    const getRandomPoint = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      return { x, y };
    };

    const autoClick = () => {
      if (targetRef.current) {
        const { x, y } = getRandomPoint(targetRef.current);
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          clientX: x,
          clientY: y,
        });
        targetRef.current.dispatchEvent(clickEvent);
        console.log(`Auto-clicked at (${x}, ${y}) in the main section`);
      }
      setTimeout(autoClick, getRandomTime()); // Recursive timeout
    };

    const timer = setTimeout(autoClick, getRandomTime());
    return () => clearTimeout(timer);
  }, [targetRef]);

  return null; // No UI, just handling auto-clicks
};

export default AutoClick;
