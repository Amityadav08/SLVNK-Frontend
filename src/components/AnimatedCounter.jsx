import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const AnimatedCounter = ({ to, duration = 1.5, className }) => {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, {
    once: true,
    margin: "-50px 0px -50px 0px",
  }); // Trigger slightly before fully in view

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;

    const controls = animate(0, to, {
      duration: duration,
      onUpdate(value) {
        // Format with '+' if needed, handle potential non-integer 'to' if necessary
        node.textContent =
          Math.round(value).toLocaleString() +
          (String(to).includes("+") ? "+" : "");
      },
    });

    // Cleanup function to stop animation if component unmounts
    return () => controls.stop();
  }, [to, duration, isInView]);

  // Render the initial state (or 0) and attach the ref
  return (
    <span ref={nodeRef} className={className}>
      0
    </span>
  );
};

export default AnimatedCounter;
