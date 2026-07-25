# Agent Guidelines & Workflow Rules (AGENT.md)

## 1. Project Overview & Target Audience
- **Developer & Owner**: Adarsh Pathania (Full-Stack Developer @ IT Company, full-time since Jan 2026).
- **Target Audience**: Startups, agency owners, SaaS founders, and client bidders seeking production-grade Web/Mobile development.
- **Tech Stack**: React 19, Next.js 15, Node.js, Hono.js, PostgreSQL (Prisma), TypeScript, Tailwind CSS v4, Framer Motion, Three.js, React Three Fiber.
- **Strict Privacy Rule**: **NEVER mention company name "Paras Technologies" anywhere**. Use `IT Company (Full-time since Jan 2026)` or `IT Company`.

## 2. Design System & Aesthetics
- **Style**: Modern 21st.dev / Linear / Raycast inspired glassmorphism, mouse-tracking spotlight cards, interactive 3D components, and crisp typography.
- **Color Palette**: Cream `#fcfaf5`, slate dark `#0f172a`, teal `#0f766e`, emerald `#059669`, and gold `#d49a3f` in Lord of the Mysteries (`isLotm`) dark mode.
- **Component Architecture**:
  - UI Primitives: `components/ui/` (`InfiniteSlider`, `ProgressiveBlur`, `Button`, etc.).
  - Portfolio Cards: `app/components/portfolio/dev21-cards.jsx` (`Dev21WhyMeCard`, `Dev21DeliveryItem`, `Dev21ProcessCard`, `Dev21ServiceCard`, `Dev21AboutCard`).
  - 3D Interactive Canvas: `app/components/portfolio/hero-scene.jsx` (`HeroScene` with Three.js).

## 3. Fast Workflow & Execution Rules
- **No Blocking Loops**: Never poll command status or inbox in a loop. Background tasks and build commands notify automatically.
- **Incremental Verification**: Always run `npm run build` using `run_command` after layout/code updates to catch type or import issues early.
- **Direct Edits**: Use `replace_file_content` for targeted line changes and `write_to_file` for new files.
