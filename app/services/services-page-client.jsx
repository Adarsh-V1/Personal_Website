"use client";

import React, { useState } from "react";

import AnimatedBackdrop from "../components/animated-backdrop";
import { HoverEffect } from "../components/servicesCom/HoverEffect";
import ProjectForm from "../components/servicesCom/ServiceForm";

const services = [
  {
    title: "3D Portfolio Websites",
    description: "Interactive 3D websites with smooth animations to showcase your work or business.",
    serviceName: "3D Portfolio Websites",
  },
  {
    title: "Responsive React.js Websites",
    description: "Modern, fast, and mobile-friendly websites built with React.js and Tailwind CSS.",
    serviceName: "Responsive React.js Websites",
  },
  {
    title: "FullStack MERN Applications",
    description: "Complete apps with MongoDB, Express, React, Node.js — including auth, DB and dashboards.",
    serviceName: "FullStack MERN Applications",
  },
  {
    title: "AI & ML Web Integration",
    description: "Add ML and DL features to apps for predictions, analytics, or smart tools.",
    serviceName: "AI & ML Web Integration",
  },
  {
    title: "Collaborate on Your Web Project",
    description: "Pair up and build your project together with hands-on guidance.",
    serviceName: "Collaboration",
  },
  {
    title: "Chess Coaching & Analysis",
    description: "Personalized coaching from a 2000+ rated rapid player. Improve strategy and tactics.",
    serviceName: "Chess Coaching",
  },
];

export default function ServicesPageClient() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <main className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 text-white contrast-125">
      <AnimatedBackdrop variant="servicesPage" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-28 lg:px-10">
        <section className="max-w-3xl space-y-4 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Services by Adarsh Pathania
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Full-stack development services for high-performance web products.
          </h1>
          <p className="text-base leading-7 text-slate-300 sm:text-lg">
            I help founders, teams, and personal brands build modern websites, React interfaces,
            scalable full-stack applications, and polished product experiences with performance and
            discoverability in mind.
          </p>
        </section>

        <div className="relative z-10 items-center">
          <HoverEffect items={services} onItemClick={(service) => setSelectedService(service)} />
        </div>
      </div>

      {selectedService && (
        <ProjectForm
          selectedService={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </main>
  );
}
