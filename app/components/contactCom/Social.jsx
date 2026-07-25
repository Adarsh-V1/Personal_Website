"use client";
import React from "react";
import Image from "next/image";

import { PinContainer } from "../ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-full lg:pt-25 gap-20 flex-col w-full lg:w-fit flex items-center justify-center">
      <PinContainer title="Visit LinkedIn" href="https://www.linkedin.com/in/adarshpathania04/">
        <div className="flex basis-full flex-col p-4 tracking-tight text-[#c8dcff]/70 sm:basis-1/2 w-[20rem] h-80 bg-[#070b13] rounded-2xl border border-[#d49a3f]/20">
          <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-[#f6fbff]">
            LinkedIn Profile
          </h3>
          <div className="text-sm m-0! p-0! font-normal leading-relaxed mt-1">
            <span className="text-[#aac2e5]">
              Connect with me for full-stack roles, collaborations, and product discussions.
            </span>
          </div>
          <Image
            src="/images/social_linkedin.jpg"
            alt="LinkedIn profile preview"
            width={320}
            height={180}
            loading="lazy"
            sizes="(max-width: 768px) 80vw, 320px"
            className="mt-4 h-auto w-full rounded-md object-cover border border-[#d49a3f]/10 shadow-sm"
          />
        </div>
      </PinContainer>

      <PinContainer title="Visit GitHub" href="https://github.com/Adarsh-V1">
        <div className="flex basis-full flex-col p-4 tracking-tight text-[#c8dcff]/70 sm:basis-1/2 w-[20rem] h-80 bg-[#070b13] rounded-2xl border border-[#d49a3f]/20">
          <h3 className="max-w-xs pb-2! m-0! font-bold text-base text-[#f6fbff]">
            GitHub Profile
          </h3>
          <div className="text-sm m-0! p-0! font-normal leading-relaxed mt-1">
            <span className="text-[#aac2e5]">
              Explore my projects, code, and full-stack development work.
            </span>
          </div>
          <Image
            src="/images/social_github.jpg"
            alt="GitHub project preview"
            width={320}
            height={180}
            loading="lazy"
            sizes="(max-width: 768px) 80vw, 320px"
            className="mt-4 h-auto w-full rounded-md object-cover border border-[#d49a3f]/10 shadow-sm"
          />
        </div>
      </PinContainer>
    </div>
  );
}
