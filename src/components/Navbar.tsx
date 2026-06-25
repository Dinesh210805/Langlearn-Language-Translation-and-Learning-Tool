import React from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import {
  Globe2,
  Mic,
  BookOpen,
  PenTool,
  MessageSquare,
  Trophy,
  History,
  Languages,
} from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const links = [
    { to: "/translate/text", icon: <Globe2 className="w-4 h-4" />, text: "Text" },
    { to: "/translate/voice", icon: <Mic className="w-4 h-4" />, text: "Voice" },
    { to: "/learn", icon: <BookOpen className="w-4 h-4" />, text: "Learn" },
    { to: "/practice", icon: <PenTool className="w-4 h-4" />, text: "Practice" },
    { to: "/chatbot", icon: <MessageSquare className="w-4 h-4" />, text: "Tutor" },
    { to: "/achievements", icon: <Trophy className="w-4 h-4" />, text: "Progress" },
    { to: "/history", icon: <History className="w-4 h-4" />, text: "History" },
  ];

  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <div className="nav-topline">
          <Link to="/" className="brand-mark" aria-label="LangLearn home">
            <span className="brand-glyph">
              <Languages className="w-5 h-5" />
            </span>
            <span>LangLearn</span>
          </Link>

          <div className="nav-links nav-links-desktop">
            {links.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="nav-links nav-links-mobile" aria-label="Primary navigation">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  to,
  icon,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
    >
      {icon}
      <span>{text}</span>
    </RouterNavLink>
  );
}

export default Navbar;
