"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  Bot,
  Globe,
  ArrowRight,
  Check,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  Send,
  Inbox,
  Bell,
} from "lucide-react";

// ─────────────────────────────────────────────
// Gradient blobs background
// ─────────────────────────────────────────────
const GradientBlobs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[120px] animate-pulse" />
    <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-green-500/8 blur-[100px] animate-pulse delay-1000" />
    <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-teal-500/8 blur-[100px] animate-pulse delay-2000" />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// ─────────────────────────────────────────────
// Typing dots
// ─────────────────────────────────────────────
const TypingDots = () => (
  <span className="flex items-center gap-1 px-1">
    {[0, 150, 300].map((delay, i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </span>
);

// ─────────────────────────────────────────────
// Chat mock
// ─────────────────────────────────────────────
const messages = [
  { from: "user", text: "Hey! I need to send campaign to 5000 users 🚀" },
  { from: "bot", text: "Sure! Uploading your contact list..." },
  { from: "bot", text: "✅ 5,000 contacts imported. Schedule campaign?" },
  { from: "user", text: "Yes, send it now!" },
  { from: "bot", text: null }, // typing indicator
];

const ChatMock = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => (v < messages.length ? v + 1 : 0));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto mt-20 max-w-sm">
      {/* Phone glow */}
      <div className="absolute inset-0 rounded-3xl bg-green-500/20 blur-2xl scale-95" />
      <div className="relative rounded-3xl border border-white/10 bg-[#111] shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#0d0d0d] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-black font-bold text-sm">
            CR
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ChatRelay Bot</p>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>
        {/* Messages */}
        <div className="space-y-3 px-4 py-5 min-h-[240px]">
          <AnimatePresence>
            {messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.text === null ? (
                  <div className="rounded-2xl rounded-bl-sm bg-[#1a1a1a] border border-white/5 px-4 py-2.5">
                    <TypingDots />
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "rounded-br-sm bg-green-500 text-black font-medium"
                        : "rounded-bl-sm bg-[#1a1a1a] border border-white/5 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-white/5 bg-[#0d0d0d] px-4 py-3">
          <div className="flex-1 rounded-full bg-[#1a1a1a] border border-white/5 px-4 py-2 text-xs text-gray-500">
            Type a message…
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-black">
            <Send size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Scroll reveal wrapper
// ─────────────────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Feature data
// ─────────────────────────────────────────────
const features = [
  {
    icon: MessageCircle,
    title: "Bulk Messaging",
    desc: "Send personalised WhatsApp messages to thousands of contacts at once with dynamic variables and media.",
  },
  {
    icon: Bot,
    title: "AI Auto-Reply",
    desc: "Deploy intelligent chatbots that understand context, qualify leads, and respond 24 × 7 without human intervention.",
  },
  {
    icon: BarChart3,
    title: "Campaign Analytics",
    desc: "Real-time delivery rates, open rates, reply rates, and funnel drop-offs — all in one intuitive dashboard.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    desc: "Trigger messages from CRM events, webhooks, or time-based schedules. No code required.",
  },
  {
    icon: Globe,
    title: "Multi-Number Inbox",
    desc: "Manage dozens of WhatsApp Business numbers from a single shared team inbox with role-based access.",
  },
  {
    icon: Shield,
    title: "Meta-Compliant",
    desc: "Built on the official WhatsApp Business API — no ban risk, full policy compliance, enterprise-grade uptime.",
  },
];

// ─────────────────────────────────────────────
// Fake Dashboard
// ─────────────────────────────────────────────
const StatCard = ({
  label,
  value,
  delta,
  color,
}: {
  label: string;
  value: string;
  delta: string;
  color: string;
}) => (
  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur">
    <p className="text-xs font-medium uppercase tracking-widest text-gray-500">{label}</p>
    <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    <p className={`mt-1 text-xs font-semibold ${color}`}>{delta}</p>
  </div>
);

const FakeBar = ({ h, green }: { h: number; green?: boolean }) => (
  <div className="flex flex-col justify-end h-28">
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: `${h}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`w-full rounded-t-md ${green ? "bg-green-500" : "bg-white/10"}`}
    />
  </div>
);

const DashboardPreview = () => (
  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] shadow-[0_0_80px_rgba(34,197,94,0.08)]">
    {/* Titlebar */}
    <div className="flex items-center gap-2 border-b border-white/5 bg-[#080808] px-6 py-4">
      <span className="h-3 w-3 rounded-full bg-red-500/70" />
      <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
      <span className="h-3 w-3 rounded-full bg-green-500/70" />
      <span className="ml-4 text-xs text-gray-500 font-mono">app.chatrelay.io / dashboard</span>
    </div>

    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-52 flex-col gap-1 border-r border-white/5 bg-[#080808] px-3 py-6">
        {[
          { icon: BarChart3, label: "Overview", active: true },
          { icon: Send, label: "Campaigns" },
          { icon: Inbox, label: "Inbox" },
          { icon: Users, label: "Contacts" },
          { icon: Bot, label: "Chatbots" },
          { icon: Bell, label: "Alerts" },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm cursor-pointer ${
              active
                ? "bg-green-500/10 text-green-400 font-semibold"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Icon size={16} />
            {label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Messages Sent" value="2.4M" delta="↑ 18% this week" color="text-green-400" />
          <StatCard label="Delivery Rate" value="98.2%" delta="↑ 0.4% vs last week" color="text-green-400" />
          <StatCard label="Active Contacts" value="84.5K" delta="↑ 2.1K new today" color="text-green-400" />
          <StatCard label="Avg. Reply Time" value="1m 42s" delta="↓ 12s improvement" color="text-green-400" />
        </div>

        {/* Chart + recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar chart */}
          <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-xs font-semibold text-gray-400 mb-4">Messages Sent — Last 7 days</p>
            <div className="grid grid-cols-7 gap-2 items-end">
              {[55, 72, 60, 85, 70, 90, 100].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <FakeBar h={h} green={i === 6} />
                  <span className="text-[10px] text-gray-600">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent campaigns */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-xs font-semibold text-gray-400 mb-4">Recent Campaigns</p>
            <div className="space-y-3">
              {[
                { name: "Flash Sale – Diwali", rate: "96%", status: "Sent" },
                { name: "Onboarding – Wave 12", rate: "99%", status: "Sent" },
                { name: "Cart Recovery", rate: "94%", status: "Running" },
                { name: "Product Launch", rate: "—", status: "Scheduled" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/80 truncate max-w-[120px]">{c.name}</p>
                    <p className="text-[10px] text-gray-600">{c.rate} delivered</p>
                  </div>
                  <span
                    className={`text-[10px] rounded-full px-2 py-0.5 font-semibold ${
                      c.status === "Sent"
                        ? "bg-green-500/10 text-green-400"
                        : c.status === "Running"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: "₹2,499",
    period: "/mo",
    description: "Perfect for small businesses testing WhatsApp marketing.",
    features: [
      "5,000 messages / month",
      "1 WhatsApp number",
      "Basic chatbot builder",
      "Campaign analytics",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹7,999",
    period: "/mo",
    description: "For growing teams ready to scale conversational commerce.",
    features: [
      "50,000 messages / month",
      "5 WhatsApp numbers",
      "AI-powered chatbots",
      "CRM integrations",
      "Shared team inbox",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Pro",
    price: "₹19,999",
    period: "/mo",
    description: "Enterprise-grade automation for high-volume operations.",
    features: [
      "Unlimited messages",
      "Unlimited numbers",
      "Custom AI training",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [showCTA, setShowCTA] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setShowCTA(v > 0.12));
  }, [scrollYProgress]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    try {
      const controller = new AbortController();
setTimeout(() => controller.abort(), 10000);
      const res = await fetch("https://api.chatrelay.in/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
        signal: controller.signal,
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", businessName: "", message: "" });
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080808] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      <GradientBlobs />

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#080808]/80 px-6 md:px-12 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-500 text-black font-black text-sm">
            C
          </div>
          <span className="text-lg font-bold tracking-tight">ChatRelay</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-sm text-gray-400 hover:text-white hidden md:inline-flex"
          >
            Log in
          </Button>
          <Button className="bg-green-500 text-black hover:bg-green-400 text-sm font-semibold px-5">
            Start Free →
          </Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-20">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/5 px-4 py-1.5 text-xs font-semibold text-green-400 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            WhatsApp Business API — Official Partner
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] max-w-5xl mx-auto"
          >
            Automate every
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                WhatsApp conversation
              </span>
              {/* Glow underline */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-green-500/0 via-green-500/60 to-green-500/0" />
            </span>
            <br />
            at scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl mx-auto text-lg text-gray-400 leading-relaxed"
          >
            Send bulk campaigns, deploy AI chatbots, and manage every customer
            conversation — all from one powerful WhatsApp automation platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button className="group relative h-14 px-10 bg-green-500 text-black text-base font-bold hover:bg-green-400 transition-all duration-200 shadow-[0_0_40px_rgba(34,197,94,0.35)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)]">
              Start for free
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button
              variant="outline"
              className="h-14 px-10 border-white/10 text-base text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
            >
              Watch demo
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <div className="flex -space-x-2">
              {["#22c55e", "#10b981", "#14b8a6", "#06b6d4"].map((c, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-[#080808]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              Trusted by <strong className="text-white">2,400+</strong> businesses across India
            </span>
          </motion.div>
        </motion.div>

        <ChatMock />
      </section>

      {/* ── LOGO STRIP ── */}
      <section className="border-y border-white/5 bg-white/[0.01] py-10 px-6 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-600 mb-8">
          Integrated with your favourite tools
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
          {["Shopify", "Razorpay", "HubSpot", "Zoho CRM", "WooCommerce", "Zapier", "Pabbly"].map(
            (brand) => (
              <span key={brand} className="text-sm font-semibold text-gray-600 hover:text-gray-400 transition-colors cursor-default">
                {brand}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-green-400 mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Everything you need to dominate
              <br />
              <span className="text-gray-500">WhatsApp marketing</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-7 cursor-default overflow-hidden hover:border-green-500/30 transition-colors duration-300"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section id="dashboard" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-green-400 mb-4">Dashboard</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Command centre for your
              <br />
              <span className="text-gray-500">WhatsApp operations</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <DashboardPreview />
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "2.4B+", label: "Messages delivered" },
            { value: "98.7%", label: "Delivery success rate" },
            { value: "2,400+", label: "Businesses onboarded" },
            { value: "< 2s", label: "Average send latency" },
          ].map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <p className="text-4xl md:text-5xl font-black text-white">{value}</p>
              <p className="mt-2 text-sm text-gray-500">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-green-400 mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Start free. Scale as you grow. No hidden charges.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map(({ name, price, period, description, features: feats, cta, highlight }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: highlight ? 1.03 : 1.015, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`relative rounded-2xl border p-8 ${
                    highlight
                      ? "border-green-500/50 bg-green-500/5 shadow-[0_0_60px_rgba(34,197,94,0.12)]"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-black">
                      Most Popular
                    </div>
                  )}
                  <p className="text-sm font-semibold text-gray-400">{name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{price}</span>
                    <span className="text-gray-500 text-sm">{period}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{description}</p>

                  <Button
                    className={`mt-7 w-full font-bold ${
                      highlight
                        ? "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {cta}
                    <ChevronRight size={16} className="ml-1" />
                  </Button>

                  <div className="mt-8 space-y-3">
                    {feats.map((f) => (
                      <div key={f} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${highlight ? "text-green-400" : "text-gray-500"}`}
                        />
                        <span className="text-gray-400">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ── */}
      <section className="py-20 px-6 border-y border-white/5 bg-white/[0.01]">
        <Reveal className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-0.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#22c55e" className="text-green-500" />
            ))}
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            "ChatRelay transformed our customer engagement. We went from 200 manual messages a day to 50,000 automated — our revenue from WhatsApp tripled in 60 days."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-black font-bold text-sm">
              RK
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Rahul Kapoor</p>
              <p className="text-xs text-gray-500">Founder, KapoorMart · Mumbai</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-green-400 mb-4">Get in touch</p>
            <h2 className="text-4xl font-black tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-gray-500">
              Fill in your details and our team will reach out within 2 business hours.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-green-500/3 pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enquiry submitted!</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll be in touch within 2 business hours.
                  </p>
                  <Button
                    className="mt-6 bg-white/5 border border-white/10 hover:bg-white/10"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Full Name *</label>
                      <Input
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Rahul Sharma"
                        className="border-white/8 bg-white/5 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="rahul@company.com"
                        className="border-white/8 bg-white/5 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">
                        WhatsApp Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="border-white/8 bg-white/5 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Business Name *</label>
                      <Input
                        name="businessName"
                        value={formState.businessName}
                        onChange={handleChange}
                        required
                        placeholder="Acme Pvt. Ltd."
                        className="border-white/8 bg-white/5 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">
                      Tell us about your requirement
                    </label>
                    <Textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="We need to send promotional messages to 10,000 customers every week…"
                      className="border-white/8 bg-white/5 text-white placeholder:text-gray-600 focus:border-green-500/50 focus:ring-green-500/20 resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-400">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-green-500 text-black text-base font-bold hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:shadow-[0_0_45px_rgba(34,197,94,0.4)] transition-all duration-200 disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        Submit Enquiry
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500 text-black font-black text-xs">
              C
            </div>
            <span className="font-bold text-sm">ChatRelay</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-600">
            <a href="#features" className="hover:text-gray-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-400 transition-colors">Pricing</a>
            <a href="/docs" className="hover:text-gray-400 transition-colors">Docs</a>
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} ChatRelay. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── FLOATING CTA ── */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button className="h-12 px-7 bg-green-500 text-black font-bold text-sm shadow-[0_8px_32px_rgba(34,197,94,0.45)] hover:bg-green-400 hover:shadow-[0_8px_40px_rgba(34,197,94,0.6)] transition-all duration-200">
              Start Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
