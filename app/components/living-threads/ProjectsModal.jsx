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
    >
      <div className="space-y-7 animate-in fade-in duration-500">
        {/* Interactive Stack Combiner Filter Bar */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
              <span>✦</span> Stack Combiner & Tag Filter:
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Showing {filteredProjects.length} of {SHOWCASE_PROJECTS.length} Systems
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-2 rounded-2xl bg-orange-950/20 border border-orange-500/20 backdrop-blur-md">
            <button
              onClick={() => handleSelectTag('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedTag === 'All'
                  ? 'bg-orange-500 text-black font-bold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              All Projects
            </button>
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-orange-500 text-black font-bold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Workshop Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Project List Strip (Left) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Select System Blueprint:
            </span>
            {filteredProjects.map((project, idx) => {
              const isSelected = project.title === currentProject?.title;
              return (
                <div
                  key={project.title}
                  onClick={() => handleSelectProject(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-950/40 border-orange-400/80 shadow-[0_0_20px_rgba(249,115,22,0.25)] translate-x-1'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white text-base">
                      {project.title}
                    </h4>
                    <span className="text-xs font-mono text-orange-400">
                      {isSelected ? '● ACTIVE' : '○'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Holographic Workshop Table (Right) */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl border border-orange-500/30 bg-black/60 backdrop-blur-xl overflow-hidden p-6 space-y-5">
            {/* Project Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                  [ BLUEPRINT SPEC SHEET ]
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ready for Production
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                {currentProject?.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                {currentProject?.desc}
              </p>
            </div>

            {/* Visual Preview / Video Loop representation */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-orange-500/25 bg-slate-950/80 group">
              {currentProject?.image ? (
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-black">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-mono text-xl mb-2">
                    ⚡
                  </div>
                  <p className="font-mono text-xs text-orange-300">
                    DIAGNOSTIC PIPELINE ARCHITECTURE PREVIEW
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-xs mt-1">
                    Python RCNN model running distributed inferences with PyTorch
                  </p>
                </div>
              )}
              {/* Scanline hologram effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-orange-300 border border-orange-500/30">
                  ● Holographic Video Preview
                </span>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-md bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors cursor-pointer"
                >
                  GitHub Spec →
                </a>
              </div>
            </div>

            {/* Architecture Stack Breakdown */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Underlying Technology Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject?.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl text-xs font-mono bg-white/5 border border-orange-500/20 text-orange-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
    </ModalBackdrop>
  );
}
