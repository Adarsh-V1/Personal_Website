'use client'
import React from 'react';
import { FaReact, FaPython, FaJs, FaChess } from 'react-icons/fa';
import { motion } from 'framer-motion';

const skills = [
  { title: 'React.js', description: 'Building interactive UIs with reusable components.', icon: <FaReact /> },
  { title: 'Python', description: 'Efficient scripting, automation, and backend logic.', icon: <FaPython /> },
  { title: 'JavaScript', description: 'The language of the web — DOM, async, and more.', icon: <FaJs /> },
  { title: 'Node JS', description: 'Backend Technologies including Express,Node, Mongo DB', icon: <FaChess /> },
];

// Motion variants for container (staggered children)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Motion variants for individual cards
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  hover: { scale: 1.08, y: -10, rotate: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
  tap: { scale: 0.95, rotate: -2 },
};

const SkillsGrid = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-14 gap-10 p-4 justify-items-center"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          variants={cardVariant}
          whileHover="hover"
          whileTap="tap"
          className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-gray-800
                     rounded-2xl w-full max-w-xs h-72 flex flex-col items-center justify-center p-6 text-center cursor-pointer
                     text-white shadow-lg"
        >
          <div className="text-5xl mb-4 text-cyan-400">{skill.icon}</div>
          <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
          <p className="text-gray-300">{skill.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsGrid;
