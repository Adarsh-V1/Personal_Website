import { Hono } from "hono";
import { handle } from "hono/vercel";
import { prisma } from "@/lib/db";
import {
  profileSummary,
  servicesData,
  projects as fallbackProjects,
  experienceItems,
  testimonials as fallbackTestimonials,
  faqs as fallbackFaqs,
} from "@/app/data/portfolio";

const app = new Hono().basePath("/api");

// Global error handler - prevents raw plain text "Internal Server Error"
app.onError((err, c) => {
  console.error("Hono API Error:", err);
  return c.json(
    {
      success: false,
      error: err.message || "Internal Server Error",
    },
    500
  );
});

// Custom 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: "API route not found" }, 404);
});

// Simple Admin Auth Token Check
const VALID_TOKEN = "admin_session_valid_token_2026";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "celestialworthy122@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Fool@123";

const authMiddleware = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== VALID_TOKEN) {
    return c.json({ success: false, error: "Unauthorized: Invalid or missing admin token" }, 401);
  }
  await next();
};

app.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return c.json({ success: true, token: VALID_TOKEN });
    }
    return c.json({ success: false, error: "Invalid email or password" }, 401);
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET Portfolio Data with safe database fallback
app.get("/portfolio", async (c) => {
  try {
    const profile = await prisma.profile.findFirst().catch(() => null);
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } }).catch(() => []);
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []);
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } }).catch(() => []);
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } }).catch(() => []);
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []);

    return c.json({
      profile: profile || profileSummary,
      services: services.length ? services : servicesData,
      projects: projects.length ? projects : fallbackProjects,
      experiences: experiences.length ? experiences : experienceItems,
      testimonials: testimonials.length ? testimonials : fallbackTestimonials,
      faqs: faqs.length ? faqs : fallbackFaqs,
    });
  } catch (err) {
    console.warn("Portfolio fetch fallback:", err.message);
    return c.json({
      profile: profileSummary,
      services: servicesData,
      projects: fallbackProjects,
      experiences: experienceItems,
      testimonials: fallbackTestimonials,
      faqs: fallbackFaqs,
    });
  }
});

// Protected Admin Routes below
app.use("/profile/*", authMiddleware);
app.use("/profile", authMiddleware);
app.use("/services/*", authMiddleware);
app.use("/services", authMiddleware);
app.use("/projects/*", authMiddleware);
app.use("/projects", authMiddleware);
app.use("/testimonials/*", authMiddleware);
app.use("/testimonials", authMiddleware);
app.use("/faqs/*", authMiddleware);
app.use("/faqs", authMiddleware);

// Update Profile
app.put("/profile", async (c) => {
  try {
    const body = await c.req.json();
    const cleanData = {
      name: body.name || profileSummary.name,
      tagline: body.tagline || profileSummary.tagline,
      intro: body.intro || profileSummary.intro,
      availability: body.availability || profileSummary.availability,
      location: body.location || profileSummary.location,
      timezone: body.timezone || profileSummary.timezone,
      responseTime: body.responseTime || profileSummary.responseTime,
      currentRole: body.currentRole || profileSummary.currentRole,
      whatsAppLink: body.whatsAppLink || profileSummary.whatsAppLink,
      bookCallLink: body.bookCallLink || profileSummary.bookCallLink,
      hireMeLink: body.hireMeLink || profileSummary.hireMeLink,
      image: body.image || profileSummary.image,
    };
    const updated = await prisma.profile.upsert({
      where: { id: "default" },
      update: cleanData,
      create: { id: "default", ...cleanData },
    });
    return c.json({ success: true, data: updated });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD Services
app.post("/services", async (c) => {
  try {
    const body = await c.req.json();
    const data = {
      title: body.title || "New Service",
      description: body.description || "",
      serviceName: body.serviceName || body.title || "Service",
      icon: body.icon || "Wand2",
      order: body.order ?? 0,
    };
    const created = await prisma.service.create({ data });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.put("/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        serviceName: body.serviceName,
      },
    });
    return c.json({ success: true, data: updated });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.service.delete({ where: { id } }).catch(() => null);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD Projects
app.post("/projects", async (c) => {
  try {
    const body = await c.req.json();
    const data = {
      title: body.title || "Untitled Project",
      description: body.description || body.problem || "",
      problem: body.problem || "",
      solution: body.solution || "",
      result: body.result || "",
      techStack: Array.isArray(body.techStack) ? body.techStack : (body.techStack ? body.techStack.split(",").map(s=>s.trim()) : []),
      category: body.category || "Full-Stack",
      image: body.image || "/images/placeholder.jpg",
      liveLink: body.liveLink || "",
      codeLink: body.codeLink || "",
      featured: body.featured ?? true,
      order: body.order ?? 0,
    };
    const created = await prisma.project.create({ data });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.put("/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updated = await prisma.project.update({ where: { id }, data: body });
    return c.json({ success: true, data: updated });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.project.delete({ where: { id } }).catch(() => null);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD Testimonials
app.post("/testimonials", async (c) => {
  try {
    const body = await c.req.json();
    const data = {
      name: body.name || "Anonymous Client",
      role: body.role || "Client",
      company: body.company || "Company",
      content: body.content || "",
      image: body.image || "/images/me_crop.png",
      order: body.order ?? 0,
    };
    const created = await prisma.testimonial.create({ data });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/testimonials/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.testimonial.delete({ where: { id } }).catch(() => null);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD FAQs
app.post("/faqs", async (c) => {
  try {
    const body = await c.req.json();
    const data = {
      question: body.question || "",
      answer: body.answer || "",
      order: body.order ?? 0,
    };
    const created = await prisma.fAQ.create({ data });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/faqs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.fAQ.delete({ where: { id } }).catch(() => null);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
