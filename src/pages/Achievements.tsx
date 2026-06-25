import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Target, CheckCircle2 } from 'lucide-react';

function Achievements() {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: Star,
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Complete 5 lessons in one day',
      icon: Clock,
      progress: 60,
      completed: false,
    },
    {
      id: 3,
      title: 'Practice Makes Perfect',
      description: 'Complete 10 practice exercises',
      icon: Target,
      progress: 30,
      completed: false,
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
            <Trophy className="w-6 h-6" />
          </span>
          <div>
            <p className="eyebrow">Progress shelf</p>
            <h1>Achievements</h1>
          </div>
        </div>
        <div className="header-note">
          <CheckCircle2 className="w-4 h-4" />
          <span>Keep a visible trail of completed learning moments.</span>
        </div>
      </div>

      <div className="progress-grid">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -3 }}
              className={`progress-card ${
                achievement.completed ? 'progress-card-complete' : ''
              }`}
            >
              <div className="progress-card-top">
                <div className="progress-icon">
                  <Icon className="w-6 h-6" />
                </div>
                <span>{achievement.completed ? 'Complete' : 'In progress'}</span>
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="progress-track" aria-label={`${achievement.progress}% complete`}>
                <span style={{ width: `${achievement.progress}%` }} />
              </div>
              <strong>{achievement.progress}%</strong>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default Achievements;
