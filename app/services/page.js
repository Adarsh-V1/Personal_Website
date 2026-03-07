"use client";
import React, { useState } from "react";
import {HoverEffect} from '../components/servicesCom/HoverEffect'


import ProjectForm from "../components/servicesCom/ServiceForm"

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
    title: "3D Portfolio Websites",
    description: "Interactive 3D websites with smooth animations to showcase your work or business.",
    serviceName: "3D Portfolio Websites"
  },
  {
    title: "Responsive React.js Websites",
    description: "Modern, fast, and mobile-friendly websites built with React.js and Tailwind CSS.",
    serviceName: "Responsive React.js Websites"
  },
  {
    title: "FullStack MERN Applications",
    description: "Complete apps with MongoDB, Express, React, Node.js — including auth, DB & dashboards.",
    serviceName: "FullStack MERN Applications"
  },
  {
    title: "AI & ML Web Integration",
    description: "Add ML/DL features to apps for predictions, analytics, or smart tools.",
    serviceName: "AI & ML Web Integration"
  },
  {
    title: "Collaborate on Your Web Project",
    description: "Pair up and build your project together with hands-on guidance.",
    serviceName: "Collaboration"
  },
  {
    title: "Chess Coaching & Analysis",
    description: "Personalized coaching from a 2000+ rated rapid player. Improve strategy & tactics.",
    serviceName: "Chess Coaching"
  }
  ];

  return (
    <div className=" h-full w-full min-h-screen flex justify-center items-center flex-col dark:bg-linear-to-br  dark:from-cyan-950 dark:via-black contrast-125  dark:to-cyan-950  ">
      
      <div className="  items-center ">

      <HoverEffect
        items={services}
        onItemClick={(service) => setSelectedService(service)}
      />
      </div>

      {selectedService && (
        <ProjectForm
          selectedService={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
