"use client";
import React from "react";
import { HeroParallaxDemo } from "./Parallax";

import SkillsGrid from "./ImgCard";
import { useScrollAnimations } from "../scrollAnimations"; // Import hook
import Hero from "./Hero"

const Body = () => {
  // Trigger animations
  useScrollAnimations();

  return (
    <div>
      <div className="flex scale-75 md:scale-90 lg:scale-90 min-w-screen">
        <Hero/>
      </div>
    

      {/* Skills Grid Section */}
      <div className="flex items-center justify-center mt-20 scale-in">
        <SkillsGrid />
      </div>
    </div>
  );
};

export default Body;
