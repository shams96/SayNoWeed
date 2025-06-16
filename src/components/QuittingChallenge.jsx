import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, Award } from 'lucide-react';

const QuittingChallenge = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');

  // Challenge phases based on the 30-day guide
  const challengePhases = [
    { start: 1, end: 5, title: "Preparation Phase", color: "bg-green-flash" },
    { start: 6, end: 10, title: "Withdrawal Management", color: "bg-lavender" },
    { start: 11, end: 20, title: "Building New Habits", color: "bg-green-flash" },
    { start: 21, end: 30, title: "Maintenance & Growth", color: "bg-lavender" }
  ];

  // Placeholder for the 30-day challenge content
  const dailyChallenges = useRef({
    1: { title: "Set your intention", description: "Write down your reasons for quitting and set clear goals." },
    2: { title: "Remove triggers", description: "Identify and remove cannabis-related items from your environment." },
    3: { title: "Build your support team", description: "Share your plan with trusted friends or family members." },
    4: { title: "Create a quit plan", description: "Outline strategies for managing cravings and difficult situations." },
    5: { title: "Prepare for Day 1", description: "Stock up on healthy snacks and plan activities for your first day." },
    6: { title: "Day 1: Stay busy", description: "Fill your day with activities to avoid cravings." },
    7: { title: "Day 2: Hydration focus", description: "Drink plenty of water to flush out toxins." },
    8: { title: "Day 3: Mindfulness practice", description: "Try 10 minutes of meditation to manage stress." },
    9: { title: "Day 4: Exercise", description: "Engage in physical activity to boost endorphins." },
    10: { title: "Day 5: Reflect on progress", description: "Journal about your first week without cannabis." },
    11: { title: "Day 6: Identify triggers", description: "Note situations that make you crave cannabis." },
    12: { title: "Day 7: Healthy alternatives", description: "Find new hobbies to replace cannabis use." },
    13: { title: "Day 8: Sleep hygiene", description: "Establish a relaxing bedtime routine." },
    14: { title: "Day 9: Reward milestone", description: "Celebrate 2 weeks cannabis-free!" },
    15: { title: "Day 10: Social strategies", description: "Plan how to handle social situations without cannabis." },
    16: { title: "Day 11: Nutrition focus", description: "Eat balanced meals to support recovery." },
    17: { title: "Day 12: Stress management", description: "Practice deep breathing techniques." },
    18: { title: "Day 13: Support check-in", description: "Connect with your support team." },
    19: { title: "Day 14: Reflect on changes", description: "Notice improvements in your well-being." },
    20: { title: "Day 15: Halfway celebration", description: "Acknowledge your progress so far." },
    21: { title: "Day 16: Future planning", description: "Set goals for the remainder of the challenge." },
    22: { title: "Day 17: Avoid high-risk situations", description: "Steer clear of environments associated with cannabis use." },
    23: { title: "Day 18: Practice refusal skills", description: "Rehearse saying no to offers of cannabis." },
    24: { title: "Day 19: Gratitude practice", description: "List things you're grateful for in recovery." },
    25: { title: "Day 20: Self-care day", description: "Do something special to nurture yourself." },
    26: { title: "Day 21: Review progress", description: "Assess what's working and what needs adjustment." },
    27: { title: "Day 22: Learn new coping skills", description: "Try a new stress-reduction technique." },
    28: { title: "Day 23: Help others", description: "Share your experience with someone starting their journey." },
    29: { title: "Day 24: Plan for maintenance", description: "Develop strategies for long-term sobriety." },
    30: { title: "Day 30: Celebrate your achievement", description: "Reflect on your journey and reward yourself for 30 days cannabis-free!" }
  });

  // Load custom goals from localStorage or use default
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem(`dayGoals-${currentDay}`));
    if (savedGoals) {
      setCustomTitle(savedGoals.title);
      setCustomDescription(savedGoals.description);
    } else {
      setCustomTitle(dailyChallenges.current[currentDay]?.title || '');
      setCustomDescription(dailyChallenges.current[currentDay]?.description || '');
    }
  }, [currentDay]);

  // Save custom goals to localStorage
  useEffect(() => {
    localStorage.setItem(`dayGoals-${currentDay}`, JSON.stringify({
      title: customTitle,
      description: customDescription
    }));
  }, [customTitle, customDescription, currentDay]);

  const toggleDayCompletion = (day) => {
    setCompletedDays(prevCompletedDays => {
      if (prevCompletedDays.includes(day)) {
        return prevCompletedDays.filter(d => d !== day);
      } else {
        return [...prevCompletedDays, day];
      }
    });
  };

  const currentPhase = challengePhases.find(phase => 
    currentDay >= phase.start && currentDay <= phase.end
  );

  const progress = (completedDays.length / 30) * 100;

  return (
    <div className="max-w-md mx-auto min-h-screen text-white p-4">
      <div className="p-6 text-center backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className={`p-2 rounded-full ${currentDay === 1 ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            <ChevronLeft />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold flex items-center justify-center text-afterglow">
              <Calendar className="mr-2" /> Day {currentDay}
            </h1>
            <div className="text-sm">{currentPhase?.title}</div>
          </div>
          
          <button 
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className={`p-2 rounded-full ${currentDay === 30 ? 'opacity-30' : 'hover:bg-white/10'}`}
          >
            <ChevronRight />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-flash transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm mt-2">
          {completedDays.length} of 30 days completed
        </div>
      </div>

      <div className={`p-4 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl mb-6 bg-green-flash`}>
        <h2 className="text-xl font-bold mb-2 text-dark-bg">Today's Challenge</h2>
        <div className="p-4 bg-white/10 rounded-xl">
          <input
            type="text"
            className="w-full bg-transparent font-bold text-lg mb-2 focus:outline-none border-b border-white/20 pb-1 text-white placeholder-white/70"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Set your intention"
          />
          <textarea
            className="w-full bg-transparent text-white focus:outline-none resize-none h-20 placeholder-white/70"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Write down your reasons for quitting and set clear goals."
          ></textarea>
        </div>
        
        <button 
          onClick={() => toggleDayCompletion(currentDay)}
          className={`w-full mt-4 py-3 rounded-xl flex items-center justify-center transition-all ${
            completedDays.includes(currentDay) 
              ? 'bg-afterglow text-dark-bg' 
              : 'bg-dark-card hover:bg-dark-card/80 text-white'
          }`}
        >
          {completedDays.includes(currentDay) ? (
            <><Check className="mr-2" /> Challenge Completed!</>
          ) : (
            "Mark as Completed"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {challengePhases.map(phase => (
          <div 
            key={phase.title}
            className={`p-4 rounded-xl border border-white/10 ${phase.color} ${currentPhase?.title === phase.title ? 'ring-2 ring-afterglow' : ''}`}
          >
            <h3 className="font-bold text-dark-bg">{phase.title}</h3>
            <p className="text-sm text-dark-bg">Days {phase.start}-{phase.end}</p>
          </div>
        ))}
      </div>

      <div className="p-4 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl">
        <h3 className="font-bold flex items-center mb-2 text-afterglow">
          <Award className="mr-2" /> Milestone Rewards
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>7 Days Clean</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${completedDays.length >= 7 ? 'bg-green-flash' : 'bg-white/10'}`}>
              {completedDays.length >= 7 && <Check size={16} />}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>14 Days Clean</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${completedDays.length >= 14 ? 'bg-green-flash' : 'bg-white/10'}`}>
              {completedDays.length >= 14 && <Check size={16} />}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>30 Days Clean</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${completedDays.length >= 30 ? 'bg-green-flash' : 'bg-white/10'}`}>
              {completedDays.length >= 30 && <Check size={16} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuittingChallenge;
