"use client";

import React from "react";

import AnimatedBackdrop from "../components/animated-backdrop";
import { AnimatedPinDemo } from "../components/contactCom/Social";
import { GlobeDemo } from "../components/contactCom/Globe";
import ContactForm from "../components/contactCom/ContactForm";

const ContactPageContent = () => {
  return (
    <main className="relative isolate w-full min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatedBackdrop variant="contactPage" />

      <div className="absolute left-0 -top-28 z-20 w-full items-center justify-center saturate-100 contrast-100 transition-[transform,filter] duration-1000 ease-in-out hover:hue-rotate-180 hover:saturate-150 hover:contrast-150 dark:-hue-rotate-180 dark:invert lg:left-4/12 lg:top-52 lg:z-30 lg:h-fit lg:w-fit">
        <GlobeDemo />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start gap-12 p-6 pt-10 lg:flex-row lg:items-start lg:p-12">
        <section className="flex w-full flex-col justify-center gap-6 lg:w-1/2 lg:justify-start">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Contact Adarsh Pathania
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Let&apos;s build a fast, modern, search-friendly web experience.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Reach out for Next.js websites, React applications, full-stack product builds,
              dashboards, API integrations, and frontend systems designed to perform well in both
              user experience and search visibility.
            </p>
          </div>

          <div className="w-full lg:max-w-xl">
            <ContactForm />
          </div>
        </section>

        <section className="mt-6 flex w-full justify-center lg:mt-0 lg:w-1/2 lg:justify-end" aria-label="Social profiles">
          <AnimatedPinDemo />
        </section>
      </div>
    </main>
  );
};

export default ContactPageContent;
