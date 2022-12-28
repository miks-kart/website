import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import useIntersect from "./utils/useIntersect";

export default function HorizontalScrolling({ className, children }) {
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [ref, entry] = useIntersect({
    threshold: 0,
  });

  const x = useMotionValue(0);

  function resize() {
    ref3.current.style.height =
      ref4.current?.scrollWidth -
      ref3.current?.scrollWidth +
      ref4.current?.scrollHeight +
      "px";
  }

  function update() {
    const temp = `-${Math.abs(
      ref3.current.getBoundingClientRect().top -
        ref2.current.getBoundingClientRect().y
    ).toFixed(2)}px`;
    x.set(temp);
  }

  useEffect(() => {
    if (entry.isIntersecting) {
      document.addEventListener("scroll", update);
    } else {
      document.removeEventListener("scroll", update);
    }
    return () => {
      document.removeEventListener("scroll", update);
    };
  }, [entry]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={ref3}
      className="relative w-full h-screen overflow-x-visible"
      style={{
        height:
          ref4.current?.scrollWidth -
          ref3.current?.scrollWidth +
          ref4.current?.scrollHeight,
      }}
    >
      <div
        ref={ref2}
        className="sticky top-0 left-0 w-full h-screen overflow-x-hidden"
      >
        <div ref={ref} className="absolute top-0 left-0 w-full h-full" />
        <motion.div
          ref={ref4}
          className="top-0 left-0 h-full"
          style={{
            x,
          }}
        >
          <div className={className}>{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
