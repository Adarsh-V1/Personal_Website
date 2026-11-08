'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sound } from './sound';
import { PERSONAL } from './data';

export default function ChatBot({
  nodeId,
  initialFollowUps = [],
  responsesMap = {},
  accentColor = '#00f0ff',
  onFollowUpClick,
}) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hey! I'm Adarsh's neural twin. Tap any question below to inspect real systems, architecture decisions, and code solutions.`,
      timestamp: 'just now',
    },
  ]);
  const [availableFollowUps, setAvailableFollowUps] = useState(initialFollowUps);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Typewriter streaming simulator
  const streamBotResponse = (fullText, nextFollowUps = []) => {
    setIsTyping(true);
    let currentIdx = 0;
    const chunkSize = 3;
    const initialMsg = {
      sender: 'bot',
      text: '',
      timestamp: 'now',
    };

    setMessages((prev) => [...prev, initialMsg]);

    const interval = setInterval(() => {
      currentIdx += chunkSize;
      const currentSlice = fullText.slice(0, currentIdx);

      // Play subtle tick sound occasionally
      if (currentIdx % 9 === 0) {
        Sound.tick();
      }

      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          text: currentSlice,
        };
        return copy;
      });

      if (currentIdx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (nextFollowUps.length > 0) {
          setAvailableFollowUps(nextFollowUps);
        }
      }
    }, 18);
  };

  const handleAskQuestion = (question) => {
    if (isTyping || !question.trim()) return;

    Sound.click();

    // Append user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: question, timestamp: 'now' },
    ]);

    // Remove asked question from follow-ups
    setAvailableFollowUps((prev) => prev.filter((q) => q !== question));

    // Notify parent if needed for media sync
    if (onFollowUpClick) {
      onFollowUpClick(question);
    }

    // Determine answer
    const exactAnswer = responsesMap[question];

    let answerText = '';
    let nextQuestions = [];

    if (exactAnswer) {
      answerText = exactAnswer;
      // Add contextual smart followups
      nextQuestions = [
        `What else should I know about your experience?`,
        `How can we get in touch right now?`,
      ];
    } else {
      // Smart contextual matching for free-form queries
      const lower = question.toLowerCase();
      if (lower.includes('hire') || lower.includes('work') || lower.includes('availability') || lower.includes('join')) {
        answerText = `I'm currently a Full-Stack Developer at an IT Company (since Jan 2026), but I'm always open to talking about ambitious product roles, scalable backend opportunities, and AI-native apps! Hit me at ${PERSONAL.email} or on LinkedIn.`;
      } else if (lower.includes('salary') || lower.includes('rate') || lower.includes('cost')) {
        answerText = `Rates and compensation depend on role scope, ownership, and tech challenges. For contract builds, I estimate based on milestones; for full-time roles, I'm open to competitive market packages with high upside. Let's schedule a call!`;
      } else if (lower.includes('stack') || lower.includes('tech') || lower.includes('lang')) {
        answerText = `My core toolkit: Next.js 15, React 19, TypeScript, PostgreSQL (Neon/Prisma), Hono.js, Tailwind, Python, Go, and Redis. For AI: LangChain, fal.ai, OpenAI API.`;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call')) {
        answerText = `Direct line: ${PERSONAL.email} or WhatsApp at +91 7889078854. I respond within 12 hours guaranteed.`;
      } else if (lower.includes('chess')) {
        answerText = `My rating is 2000 Rapid on Chess.com / Lichess (Expert level). I play the Italian and Scotch as White, and the Sicilian (Najdorf) as Black. If you want to challenge me to a game, reach out on LinkedIn with your handle!`;
      } else {
        answerText = `That's a sharp question. In short: I focus on building reliable, high-speed applications where every query is fast and every UI state feels instantaneous. If you'd like a deep dive into that specific topic, drop me an email at ${PERSONAL.email}!`;
      }
      nextQuestions = [
        `What's your primary tech stack?`,
        `Book a discovery call with Adarsh`,
      ];
    }

    // Delay slightly to feel like human thinking
    setTimeout(() => {
      streamBotResponse(answerText, nextQuestions);
    }, 280);
  };

  return (
    <div
      className="mt-3 rounded-2xl border bg-black/50 p-3 sm:p-4 backdrop-blur-xl space-y-3"
      style={{ borderColor: `${accentColor}25` }}
    >
      {/* Bot Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
            In-Modal Neural Assistant // Adarsh
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Latency: ~18ms
        </span>
      </div>

      {/* Message Stream */}
      <div className="max-h-[160px] overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-white/10 border border-white/15 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
              {isTyping && idx === messages.length - 1 && (
                <span className="inline-block w-1.5 h-3 ml-1 bg-current animate-pulse align-middle" />
              )}
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-0.5 px-1">
              {m.sender === 'user' ? 'You' : 'Adarsh'} • {m.timestamp}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-Up Pills */}
      {availableFollowUps.length > 0 && (
        <div className="pt-1 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {availableFollowUps.map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isTyping}
                onClick={() => handleAskQuestion(q)}
                className="text-[11px] px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/40 text-slate-200 hover:text-white transition-all cursor-pointer text-left disabled:opacity-50"
              >
                ✦ {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
