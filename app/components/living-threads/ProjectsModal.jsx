'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
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
      subtitle="4 HOLOGRAPHIC BLUEPRINT PODS MATERIALIZED • SYSTEM ARCHITECTURE"
      accentColor="#f97316"
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* POD 1: System Selector Deck (4 Cols) */}
        <HudWindow
          title="SYSTEM SELECTOR"
          tag={`${filteredProjects.length} BLUEPRINTS`}
          accentColor="#f97316"
          delay={0.04}
          animationType="slideRight"
          className="md:col-span-4"
        >
          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1 pb-2 border-b border-white/10 mb-2">
            <button
              onClick={() => handleSelectTag('All')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                selectedTag === 'All'
                  ? 'bg-orange-500 text-black font-bold shadow-[0_0_8px_#f97316]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              All
            </button>
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-orange-500 text-black font-bold shadow-[0_0_8px_#f97316]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredProjects.map((project, idx) => {
              const isSelected = project.title === currentProject?.title;
              return (
                <div
                  key={project.title}
                  onClick={() => handleSelectProject(idx)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-950/40 border-orange-400/80 shadow-[0_0_15px_rgba(249,115,22,0.25)] translate-x-0.5'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-white text-xs">{project.title}</h5>
                    <span className="text-[9px] font-mono text-orange-400 font-bold">
                      {isSelected ? '● ACTIVE' : '○'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{project.desc}</p>
                </div>
              );
            })}
          </div>
        </HudWindow>

        {/* POD 2: Holographic Video/Image Preview (5 Cols) */}
        <HudWindow
          title="BLUEPRINT PREVIEW"
          tag="LIVE RENDERING"
          accentColor="#fb923c"
          delay={0.12}
          animationType="scale"
          className="md:col-span-5"
        >
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-orange-500/30 bg-slate-950 group">
            {currentProject?.image ? (
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
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
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-orange-300 border border-orange-500/30">
                ● {currentProject?.title}
              </span>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-0.5 rounded bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
              >
                GitHub Spec →
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            {currentProject?.desc}
          </p>
        </HudWindow>

        {/* POD 3: Stack Matrix Pod (3 Cols) */}
        <HudWindow
          title="TECH SPECS"
          tag="ARCHITECTURE"
          accentColor="#ea580c"
          delay={0.18}
          animationType="slideLeft"
          className="md:col-span-3"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Stack Composition:
            </span>
            <div className="flex flex-wrap gap-1">
              {currentProject?.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-orange-500/25 text-orange-200"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400 space-y-1">
              <div>⚡ Latency Target: &lt; 50ms</div>
              <div>🔒 Auth: RBAC / Edge JWT</div>
              <div>🌐 Deployment: Edge Nodes</div>
            </div>
          </div>
        </HudWindow>

        {/* POD 4: In-Modal Chatbot Dynamic Deep-Dive (12 Cols) */}
        <HudWindow
          title="AI ARCHITECT TRANSCEIVER"
          tag="SYNCED REASONING"
          accentColor="#f97316"
          delay={0.24}
          animationType="slideUp"
          className="md:col-span-12"
        >
          <ChatBot
            nodeId="projects"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#f97316"
            onFollowUpClick={handleFollowUpSync}
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
