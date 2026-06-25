import { motion } from "framer-motion";
import {
  History as HistoryIcon,
  Globe2,
  BookOpen,
  PenTool,
  CalendarDays,
} from "lucide-react";

function History() {
  const activities = [
    {
      id: 1,
      type: "translation",
      icon: Globe2,
      title: "Text Translation",
      description: 'Translated "Hello, how are you?" to Spanish',
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "lesson",
      icon: BookOpen,
      title: "Lesson Completed",
      description: "Basic Greetings - Spanish",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      type: "practice",
      icon: PenTool,
      title: "Practice Exercise",
      description: "Vocabulary Quiz - Score: 8/10",
      timestamp: "2 days ago",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-shell page-stack"
    >
      <div className="page-header split-header">
        <div className="title-lockup">
          <span className="section-icon">
            <HistoryIcon className="w-6 h-6" />
          </span>
          <div>
            <p className="eyebrow">Recent activity</p>
            <h1>Learning History</h1>
          </div>
        </div>
        <div className="header-note">
          <CalendarDays className="w-4 h-4" />
          <span>Review what you translated, studied, and practiced.</span>
        </div>
      </div>

      <div className="timeline-list">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              whileHover={{ x: 3 }}
              className="timeline-item"
            >
              <div className="timeline-marker">
                <Icon className="w-5 h-5" />
              </div>
              <div className="timeline-content">
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
                <time>{activity.timestamp}</time>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default History;
