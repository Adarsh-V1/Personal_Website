'use client'
import React, { useRef, useEffect, useState } from "react";
import projectInfo from "./info";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";
import Select from "react-select";

const options = [
  { value: "none", label: "All Projects" },
  { value: "React JS", label: "React JS" },
  { value: "Next JS", label: "Next JS" },
  { value: "Python", label: "Python" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    borderColor: "#333",
    color: "#fff",
    padding: "2px 4px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
    color: "#fff",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
};

const Card = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const filteredProjects =
    selectedOption.value === "none"
      ? projectInfo
      : projectInfo.filter((project) =>
          project.main.includes(selectedOption.value)
        );

  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="flex h-full justify-center flex-col items-center p-4 sm:p-10">
          {/* Header */}
          <div className="sticky top-20 z-10 w-full px-4 sm:px-20 py-2 flex flex-col lg:flex-row md:flex-row justify-around items-center gap-4">
            <h1 className="theme-text dark:text-neutral-200 text-2xl lg:text-3xl font-bold text-center">
              Featured Projects
            </h1>

            <div className="flex items-center gap-2 z-50 relative w-full md:w-auto theme-text">
              <label className="dark:text-neutral-300 text-base lg:text-lg">
                Filter By Tech:
              </label>
              <Select
              inputProps= {{inputMode:"none"}}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                options={options}
                isSearchable = {false}
                styles={customStyles}
                className="w-48 outline "
              />
            </div>
          </div>

          {/* Project Cards */}
          <div className="lg:grid z-0  mt-10 lg:mt-24 md:mt-14 lg:gap-y-10 h-full lg:gap-x-20 lg:grid-cols-2    ">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="flex lg:scale-90 theme-card shadow-2xl rounded-2xl border border-white/10 bg-[#0a0e17] hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,217,245,0.15)] transition-all duration-300 ease-in-out mb-0 lg:mb-10 md:mb-10 md:max-w-xl md:flex-row flex-col scale-[0.75] md:scale-[0.85] overflow-hidden"
              >
                <img
                  className="h-96 max-sm:h-48 w-full object-cover md:h-auto md:w-56"
                  src={project.winView.src || project.winView}
                  alt={project.name}
                />
                <div className="flex flex-col justify-start p-4 lg:p-6 gap-2 lg:gap-4">
                  <h5 className="text-xl font-bold text-white text-center lg:text-left">
                    {project.name}
                  </h5>
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {project.desc}
                  </p>
                  <p className="text-xs text-cyan-400 font-mono">
                    {project.techUsed.join(" • ")}
                  </p>
                  <div className="flex flex-col md:flex-row text-sm gap-2 mt-2 justify-between">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/15 bg-white/5 rounded-xl px-4 py-2 text-center text-xs font-semibold text-slate-200 hover:bg-white/10 hover:border-white/25 transition"
                    >
                      Source Code
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl px-4 py-2 text-center text-xs font-bold text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(0,245,160,0.3)] transition"
                      >
                        Live Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Card;
