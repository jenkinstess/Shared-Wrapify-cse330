// source code: https://github.com/Darth-Knoppix/loading-animation/blob/master/src/ThreeDotsWave.js

import React from "react";
import { motion } from "framer-motion";

const ballStyle = {
  display: "inline-block",
  width: "100px",
  height: "100px",
  backgroundColor: "black",
  borderRadius: "1.9rem"
};

const bounceTransition = {
  y: {
    duration: 2,
    yoyo: Infinity,
    ease: "easeOut"
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: "easeOut",
    repeatDelay: 2.8
  }
};

export default function BouncingBall() {
  return (
    <div
      style={{
        width: "2rem",
        height: "2rem",
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <motion.span
        style={ballStyle}
        transition={bounceTransition}
        animate={{
          y: ["200%", "-200%"],
          backgroundColor: ["#ff6699", "#6666ff"]
        }}
      />
    </div>
  );
}