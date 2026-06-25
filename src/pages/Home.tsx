import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  History,
  MessageSquare,
  Mic,
  PenTool,
  Trophy,
} from "lucide-react";

const features = [
  {
    to: "/translate/text",
    icon: Globe2,
    title: "Translate",
    description: "Text translation with grammar, examples, and usage context.",
  },
  {
    to: "/translate/voice",
    icon: Mic,
    title: "Voice",
    description: "Record speech, transcribe it, and translate the result.",
  },
  {
    to: "/learn",
    icon: BookOpen,
    title: "Lessons",
    description: "Structured language lessons with quizzes and summaries.",
  },
  {
    to: "/practice",
    icon: PenTool,
    title: "Practice",
    description: "Vocabulary, sentence building, and interactive exercises.",
  },
  {
    to: "/chatbot",
    icon: MessageSquare,
    title: "Tutor",
    description: "Ask questions and practice with an AI language coach.",
  },
  {
    to: "/achievements",
    icon: Trophy,
    title: "Progress",
    description: "Review achievements and your recent learning history.",
  },
];

const metrics = [
  { value: "11", label: "translation languages" },
  { value: "8", label: "practice modes" },
  { value: "AI", label: "guided explanations" },
];

function Home() {
  return (
    <section className="home-page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="home-hero"
      >
        <div className="hero-content">
          <p className="eyebrow">Language study desk</p>
          <h1>Translate once. Practice until it becomes yours.</h1>
          <div className="hero-actions">
            <Link to="/translate/text" className="primary-action">
              Start translating
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/practice" className="secondary-action">
              Practice set
              <PenTool className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Learning snapshot">
          <div className="hero-panel-header">
            <span>Today</span>
            <span>A1 Spanish</span>
          </div>
          <div className="phrase-stack">
            <span className="phrase-source">How are you?</span>
            <span className="phrase-arrow">to</span>
            <span className="phrase-target">¿Cómo estás?</span>
          </div>
          <p>
            Grammar, pronunciation, examples, and culture stay attached to each
            translation so a quick lookup can turn into a focused study session.
          </p>
          <div className="hero-mini-list">
            <span>literal meaning</span>
            <span>usage notes</span>
            <span>practice tips</span>
          </div>
        </div>
      </motion.div>

      <div className="metric-strip">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-item">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard key={feature.to} index={index} {...feature} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="study-flow"
      >
        <div>
          <p className="eyebrow">One loop, three moves</p>
          <h2>Move from answer to understanding.</h2>
        </div>
        <div className="flow-steps">
          <Link to="/translate/text" className="flow-step">
            <Globe2 className="w-5 h-5" />
            <span>Translate</span>
          </Link>
          <Link to="/learn" className="flow-step">
            <BookOpen className="w-5 h-5" />
            <span>Study</span>
          </Link>
          <Link to="/history" className="flow-step">
            <History className="w-5 h-5" />
            <span>Review</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

interface FeatureCardProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({
  to,
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <Link to={to} className="feature-card">
        <div className="feature-card-top">
          <Icon className="w-5 h-5" />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
      </Link>
    </motion.div>
  );
}

export default Home;
