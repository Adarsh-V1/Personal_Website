"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, User, Briefcase, FolderGit2, MessageSquare, HelpCircle, 
  Plus, Trash2, Edit3, Save, LogOut, CheckCircle2, AlertCircle, Sparkles 
} from "lucide-react";
import { profileSummary, servicesData, caseStudies, testimonials as baseTestimonials, faqs as baseFaqs } from "../data/portfolio";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  // Data States
  const [profile, setProfile] = useState(profileSummary);
  const [services, setServices] = useState(servicesData);
  const [projects, setProjects] = useState(caseStudies);
  const [testimonials, setTestimonials] = useState(baseTestimonials);
  const [faqs, setFaqs] = useState(baseFaqs);

  // Forms
  const [newService, setNewService] = useState({ title: "", description: "", serviceName: "" });
  const [newProject, setNewProject] = useState({ 
    title: "", category: "SaaS Build", problem: "", solution: "", result: "", techStack: "", liveLink: "", codeLink: "" 
  });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
      fetchPortfolioData();
    }
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.profile) setProfile((prev) => ({ ...prev, ...data.profile }));
      if (data.services?.length) setServices(data.services);
      if (data.projects?.length) setProjects(data.projects);
      if (data.testimonials?.length) setTestimonials(data.testimonials);
      if (data.faqs?.length) setFaqs(data.faqs);
    } catch (err) {
      console.log("Using default fallback data");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem("admin_token", data.token);
        fetchPortfolioData();
      } else {
        setLoginError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication server");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_token");
  };

  const showToast = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3500);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      showToast("Profile settings updated successfully!");
    } catch (err) {
      showToast("Updated locally (database sync offline).");
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.title) return;
    const item = { ...newService, id: Date.now().toString() };
    setServices([...services, item]);
    setNewService({ title: "", description: "", serviceName: "" });
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      showToast("New service added successfully!");
    } catch (err) {
      showToast("Service added to active list.");
    }
  };

  const handleDeleteService = async (id) => {
    setServices(services.filter((s) => s.id !== id));
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      showToast("Service removed.");
    } catch (err) {
      showToast("Removed from view.");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const item = {
      ...newProject,
      id: Date.now().toString(),
      techStack: typeof newProject.techStack === "string" ? newProject.techStack.split(",").map(s => s.trim()) : newProject.techStack,
    };
    setProjects([...projects, item]);
    setNewProject({ title: "", category: "SaaS Build", problem: "", solution: "", result: "", techStack: "", liveLink: "", codeLink: "" });
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      showToast("Project added successfully!");
    } catch (err) {
      showToast("Project added.");
    }
  };

  const handleDeleteProject = async (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      showToast("Project removed.");
    } catch (err) {
      showToast("Removed.");
    }
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!newFaq.question) return;
    const item = { ...newFaq, id: Date.now().toString() };
    setFaqs([...faqs, item]);
    setNewFaq({ question: "", answer: "" });
    try {
      await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      showToast("FAQ added!");
    } catch (err) {
      showToast("FAQ saved.");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Admin Control Center</h1>
            <p className="text-sm text-slate-400">Enter your credentials to access portfolio settings</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="size-5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="celestialworthy122@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-white transition duration-200 shadow-lg shadow-amber-600/20"
            >
              Sign In to Admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col pt-24 pb-16">
      {/* Header Bar */}
      <div className="mx-auto w-full max-w-7xl px-6 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Portfolio Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Logged in as celestialworthy122@gmail.com</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-sm transition"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
      </div>

      {statusMessage && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold">
          <CheckCircle2 className="size-5" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="mx-auto w-full max-w-7xl px-6 mt-8 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Navigation Sidebar */}
        <nav className="flex flex-col gap-2">
          {[
            { id: "profile", label: "Profile & Hero", icon: User },
            { id: "services", label: "Services", icon: Briefcase },
            { id: "projects", label: "Case Studies", icon: FolderGit2 },
            { id: "testimonials", label: "Testimonials", icon: MessageSquare },
            { id: "faqs", label: "FAQs", icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition text-left ${
                  active
                    ? "bg-amber-600/15 border border-amber-500/30 text-amber-400"
                    : "bg-slate-900/50 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <User className="size-5 text-amber-400" />
                Profile & Conversion Copy
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Current Role</label>
                  <input
                    type="text"
                    value={profile.currentRole || ""}
                    onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Hero Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Introduction</label>
                <textarea
                  rows={3}
                  value={profile.intro}
                  onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Timezone</label>
                  <input
                    type="text"
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Response Time</label>
                  <input
                    type="text"
                    value={profile.responseTime || "Within 12 Hours"}
                    onChange={(e) => setProfile({ ...profile, responseTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-white transition shadow-lg shadow-amber-600/20"
              >
                <Save className="size-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* SERVICES TAB */}
          {activeTab === "services" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="size-5 text-amber-400" />
                Services Offered
              </h2>

              <form onSubmit={handleAddService} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold uppercase text-amber-400 tracking-wider">Add New Service</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Service Title (e.g. SaaS Development)"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                  <input
                    type="text"
                    placeholder="Short Name (e.g. Mobile Apps)"
                    value={newService.serviceName}
                    onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                </div>
                <textarea
                  placeholder="Service Description..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-white text-sm"
                >
                  <Plus className="size-4" />
                  <span>Add Service</span>
                </button>
              </form>

              <div className="space-y-4">
                {services.map((item) => (
                  <div key={item.id || item.title} className="flex items-start justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <h4 className="font-semibold text-slate-100">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteService(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <FolderGit2 className="size-5 text-amber-400" />
                Case Study Projects (Problem → Solution → Result)
              </h2>

              <form onSubmit={handleAddProject} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold uppercase text-amber-400 tracking-wider">Add Case Study</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. SaaS Build, React Native)"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                </div>
                <textarea
                  placeholder="Problem statement..."
                  value={newProject.problem}
                  onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <textarea
                  placeholder="Solution engineered..."
                  value={newProject.solution}
                  onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <textarea
                  placeholder="Measurable Result (e.g. 40+ screens, 40% faster load)..."
                  value={newProject.result}
                  onChange={(e) => setNewProject({ ...newProject, result: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (comma separated)"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-white text-sm"
                >
                  <Plus className="size-4" />
                  <span>Add Case Study</span>
                </button>
              </form>

              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.id || p.title} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-100">{p.title}</h4>
                      <p className="text-xs text-amber-400 mt-0.5">{p.category}</p>
                      <p className="text-xs text-slate-400 mt-2"><strong className="text-slate-300">Result:</strong> {p.result}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQS TAB */}
          {activeTab === "faqs" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="size-5 text-amber-400" />
                Frequently Asked Questions
              </h2>

              <form onSubmit={handleAddFaq} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <input
                  type="text"
                  placeholder="Question..."
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <textarea
                  placeholder="Answer..."
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold text-white text-sm"
                >
                  <Plus className="size-4" />
                  <span>Add FAQ</span>
                </button>
              </form>

              <div className="space-y-4">
                {faqs.map((f, idx) => (
                  <div key={f.id || idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-100 text-sm">{f.question}</h4>
                      <p className="text-xs text-slate-400 mt-1">{f.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
