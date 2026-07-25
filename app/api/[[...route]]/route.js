import { Hono } from "hono";
import { handle } from "hono/vercel";
import { prisma } from "@/lib/db";

const app = new Hono().basePath("/api");

// Simple Admin Auth Check
const ADMIN_EMAIL = "celestialworthy122@gmail.com";
const ADMIN_PASSWORD = "Fool@123";

app.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return c.json({ success: true, token: "admin_session_valid_token_2026" });
    }
    return c.json({ success: false, error: "Invalid credentials" }, 401);
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET Portfolio Data
app.get("/portfolio", async (c) => {
  try {
    const profile = await prisma.profile.findFirst();
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });

    return c.json({
      profile,
      services,
      projects,
      experiences,
      testimonials,
      faqs,
    });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// Update Profile
app.put("/profile", async (c) => {
  try {
    const body = await c.req.json();
    const updated = await prisma.profile.upsert({
      where: { id: "default" },
      update: body,
      create: { id: "default", ...body },
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
    const created = await prisma.service.create({ data: body });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.put("/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updated = await prisma.service.update({ where: { id }, data: body });
    return c.json({ success: true, data: updated });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/services/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.service.delete({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD Projects
app.post("/projects", async (c) => {
  try {
    const body = await c.req.json();
    const created = await prisma.project.create({ data: body });
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
    await prisma.project.delete({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD Testimonials
app.post("/testimonials", async (c) => {
  try {
    const body = await c.req.json();
    const created = await prisma.testimonial.create({ data: body });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/testimonials/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.testimonial.delete({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// CRUD FAQs
app.post("/faqs", async (c) => {
  try {
    const body = await c.req.json();
    const created = await prisma.fAQ.create({ data: body });
    return c.json({ success: true, data: created });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

app.delete("/faqs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.fAQ.delete({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
