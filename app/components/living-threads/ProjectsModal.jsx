'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ModalBackdrop from './ModalBackdrop';
import ChatBot from './ChatBot';
import { SHOWCASE_PROJECTS, PROJECT_TAGS, QUESTIONS, PERSONAL } from './data';
import { Sound } from './sound';

export default function ProjectsModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'projects') || {};
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const filteredProjects = selectedTag === 'All'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter((p) => p.tags.includes(selectedTag));

  const currentProject = filteredProjects[activeProjectIdx] || filteredProjects[0] || SHOWCASE_PROJECTS[0];

  const handleSelectTag = (tag) => {
    Sound.click();
    setSelectedTag(tag);
    setActiveProjectIdx(0);
  };

  const handleSelectProject = (idx) => {
    Sound.click();
    setActiveProjectIdx(idx);
  };

  // Dynamic Media Morphing on Chatbot Follow-Up Click
  const handleFollowUpSync = (question) => {
    if (question.includes('hardest')) {
      const idx = SHOWCASE_PROJECTS.findIndex((p) => p.title.includes('Atella'));
      if (idx !== -1) setActiveProjectIdx(idx);
    } else if (question.includes('architecture') || question.includes('top app')) {
      const idx = SHOWCASE_PROJECTS.findIndex((p) => p.title.includes('Chatx2'));
      if (idx !== -1) setActiveProjectIdx(idx);
    } else if (question.includes('deployment') || question.includes('fix')) {
      const idx = SHOWCASE_PROJECTS.findIndex((p) => p.title.includes('JetPlus'));
      if (idx !== -1) setActiveProjectIdx(idx);
    }
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="THE WORKSHOP // FLAGSHIP COOKBOOK"
      subtitle="ISOMETRIC BLUEPRINT VIEW • SYSTEM ARCHITECTURE & PROOF"
      accentColor="#f97316"
      maxWidth="max-w-6xl"
    >
      <div className="space-y-4 animate-in fade-in duration-300">
        {/* Interactive Stack Combiner Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-orange-950/20 border border-orange-500/20 backdrop-blur-md">
            <button
              onClick={() => handleSelectTag('All')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedTag === 'All'
                  ? 'bg-orange-500 text-black font-bold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              All Systems ({SHOWCASE_PROJECTS.length})
            </button>
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-orange-500 text-black font-bold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-mono text-orange-400">
            Showing {filteredProjects.length} Systems
          </span>
        </div>

        {/* Blueprint Workshop Deck (Zero Overflow 2-Column Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Project List Strip (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2 max-h-[58vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredProjects.map((project, idx) => {
              const isSelected = project.title === currentProject?.title;
              return (
                <div
                  key={project.title}
                  onClick={() => handleSelectProject(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-950/40 border-orange-400/80 shadow-[0_0_18px_rgba(249,115,22,0.25)] translate-x-1'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-sm">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-mono text-orange-400 font-bold">
                      {isSelected ? '● ACTIVE' : '○'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Holographic Workshop Table (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-orange-500/30 bg-black/60 backdrop-blur-xl p-4 sm:p-5 space-y-3.5">
            {/* Visual Preview */}
            <div className="relative aspect-video max-h-44 w-full rounded-xl overflow-hidden border border-orange-500/25 bg-slate-950/80 group shrink-0">
              {currentProject?.image ? (
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-black">
                  <p className="font-mono text-xs text-orange-300">
                    DIAGNOSTIC PIPELINE ARCHITECTURE PREVIEW
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-300 border border-orange-500/30 text-[10px]">
                  ● {currentProject?.title}
                </span>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-0.5 rounded bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors cursor-pointer text-[10px]"
                >
                  GitHub Spec →
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentProject?.desc}
            </p>

            {/* Architecture Stack Breakdown */}
            <div className="flex flex-wrap gap-1.5">
              {currentProject?.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 border border-orange-500/20 text-orange-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* In-Modal Chatbot with Dynamic Media Sync */}
            <ChatBot
              nodeId="projects"
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#f97316"
              onFollowUpClick={handleFollowUpSync}
            />
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}
