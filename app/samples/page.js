import React from "react";

import Card from "../components/workCom/Card";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Browse featured projects and coding samples by Adarsh Pathania, including React apps, Next.js builds, Python tools, interactive UI work, and full-stack experiments.",
  path: "/samples",
  keywords: [
    "Adarsh Pathania projects",
    "Adarsh portfolio projects",
    "Next.js samples",
    "React project showcase",
  ],
});

const Samples = ()=>{

   return(
      <main className="w-screen min-h-screen h-full overflow-x-hidden bg-slate-950 px-6 pb-16 pt-28 text-white dark:bg-linear-to-br dark:from-black dark:via-slate-950 dark:to-black lg:px-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
               <section className="max-w-3xl space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                     Featured work by Adarsh Pathania
                  </p>
                  <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                     Projects, product experiments, and practical development samples.
                  </h1>
                  <p className="text-base leading-7 text-slate-300 sm:text-lg">
                     Explore selected work across React, Next.js, JavaScript, Python, APIs, and
                     interactive frontends built to demonstrate real product thinking.
                  </p>
               </section>

            <div>
               <Card/>
            </div>
         </div>
      </main>
   )
}

export default Samples;


