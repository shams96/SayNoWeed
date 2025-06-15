import React, { useState, useEffect } from 'react';
import {
  Trophy, CheckCircle, Circle, Target
} from 'lucide-react';

/* ------------------------------------------------------------------
   30-DAY CHALLENGE DATA  (fill 8-30 later)
------------------------------------------------------------------- */
const challengeContent = {
  1: { phase: 'Preparation Phase', range: 'Days 1-5',  title: 'Set your intention',       quote: 'Write down your reasons for quitting and set clear goals.' },
  2: { phase: 'Preparation Phase', range: 'Days 1-5',  title: 'Structure your time',      quote: 'Boredom triggers cravings. Create structure to feel in control.' },
  3: { phase: 'Preparation Phase', range: 'Days 1-5',  title: 'Reinforce your decision',  quote: 'Faith in yourself must work 24 hours a day.' },
  4: { phase: 'Preparation Phase', range: 'Days 1-5',  title: 'Find healthy substitutes', quote: 'Cravings pass. Rewire your response.' },
  5: { phase: 'Preparation Phase', range: 'Days 1-5',  title: 'Celebrate physical wins',  quote: 'Notice and celebrate your body healing already.' },
  6: { phase: 'Withdrawal Mgmt',   range: 'Days 6-10', title: 'Manage cravings',          quote: 'The craving will pass whether you use or not.' },
  7: { phase: 'Withdrawal Mgmt',   range: 'Days 6-10', title: 'Reflect & plan',           quote: 'You’ve survived your toughest days. This is no different.' },
  // … add Day 8-30
};

/* micro-actions (XP=10 each) */
const dailyQuests = {
  1: [ 'List 3 reasons you want to quit.',
       'Tell a friend about your decision.',
       'Create a “why I quit” phone wallpaper.' ],
  2: [ 'Block out today in hourly chunks.',
       'Schedule two healthy breaks (walk, meditate).',
       'Replace one “weed-time” activity with something fun.' ],
  3: [ 'Throw away any paraphernalia.',
       'Re-read your reasons for quitting.',
       'Book a wellness activity for tomorrow.' ],
  4: [ 'Carry mints or a stress ball today.',
       'Replace a craving with deep breathing.',
       'Join an online support group.' ],
  5: [ 'Write one physical improvement you notice.',
       'Do 15 min of movement.',
       'Treat yourself with something healthy.' ],
  6: [ 'Drink 6 glasses of water.',
       'Journal triggers & coping strategies.',
       'Call or text someone supportive.' ],
  7: [ 'Plan 3 balanced meals.',
       'Write a win you’re proud of.',
       'Set 3 goals for Week 2.' ],
};

/* daily encouragement */
const encouragementTips = {
  1: '💡 Urges peak in 10 min — breathe through the wave.',
  2: '💬 You’re not starting from scratch — you’re starting from experience.',
  3: '🧠 Craving ≠ command. Name it, feel it, let it pass.',
  4: '📱 Music, short walk, or text a friend right now.',
  5: '🎯 Five days clean — grit most never try.',
  6: '💓 Your brain is healing. Clarity builds every hour.',
  7: '🌟 Recovery is a spiral staircase — keep stepping.',
};

const xpPerQuest = 10;

/* ------------------------------------------------------------------ */
const RecoveryQuestApp = () => {
  /* persistent state */
  const [state, setState] = useState(() => {
    const s = JSON.parse(localStorage.getItem('recoveryQuest') || '{}');
    return {
      startDate:       s.startDate       || new Date().toISOString().split('T')[0],
      completedTasks:  s.completedTasks  || {},
      completedDays:   s.completedDays   || [],
      totalXP:         s.totalXP         || 0,
      level:           s.level           || 1,
      streak:          s.streak          || 0,
    };
  });

  const save = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    localStorage.setItem('recoveryQuest', JSON.stringify(next));
  };

  /* derived info */
  const todayISO  = new Date().toISOString().split('T')[0];
  const dayNumber = Math.min(30,
    Math.floor((new Date(todayISO) - new Date(state.startDate)) / 86400000) + 1);
  const challenge = challengeContent[dayNumber] || {};
  const quests    = dailyQuests[dayNumber]     || [];
  const tip       = encouragementTips[dayNumber] || 'You’re doing better than you think.';

  /* auto-update level */
  useEffect(() => {
    const lvl = Math.floor(state.totalXP / 100) + 1;
    if (lvl !== state.level) save({ level: lvl });
  }, [state.totalXP]);

  /* toggle quest */
  const toggleQuest = (i) => {
    const key  = `${todayISO}_q_${i}`;
    const done = !!state.completedTasks[key];
    const newTasks = { ...state.completedTasks, [key]: !done };
    if (done) delete newTasks[key];

    const allDone = quests.every((_, idx) => newTasks[`${todayISO}_q_${idx}`]);

    /* streak calc */
    let newStreak = state.streak;
    if (!done && allDone) {
      const yISO = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      newStreak = state.completedDays.includes(yISO) ? state.streak + 1 : 1;
    }

    save({
      completedTasks: newTasks,
      totalXP: state.totalXP + (done ? -xpPerQuest : xpPerQuest),
      streak: newStreak,
      completedDays: allDone && !state.completedDays.includes(todayISO)
        ? [...state.completedDays, todayISO]
        : state.completedDays,
    });
  };

  /* helpers */
  const progressPct = Math.round((state.completedDays.length / 30) * 100);

  /* UI */
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
        <Trophy className="w-8 h-8 text-green-400 mr-2" /> SayNoWeed
      </h1>

      {/* XP / LEVEL CARD */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 text-center">
        <div className="flex justify-around text-green-300 mb-2">
          <div><div className="text-2xl font-semibold">{state.totalXP}</div><div className="text-xs">XP</div></div>
          <div><div className="text-2xl font-semibold">Lvl {state.level}</div><div className="text-xs">Progress</div></div>
          <div><div className="text-2xl font-semibold">{state.streak}</div><div className="text-xs">Streak</div></div>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full mt-2">
          <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-xs opacity-80 mt-1">{state.completedDays.length} / 30 days completed</p>
      </div>

      {/* PHASE GRID */}
      <div className="grid grid-cols-2 gap-3 mb-6 text-sm font-semibold">
        {[
          { label:'Preparation Phase',    range:'Days 1-5',  active: dayNumber<=5,  color:'bg-lime-500/70'},
          { label:'Withdrawal Mgmt',      range:'Days 6-10', active: dayNumber>5 && dayNumber<=10, color:'bg-pink-500/70'},
          { label:'Building Habits',      range:'Days 11-20',active: dayNumber>10 && dayNumber<=20, color:'bg-lime-500/70'},
          { label:'Maintenance & Growth', range:'Days 21-30',active: dayNumber>20, color:'bg-pink-500/70'},
        ].map((p, idx) => (
          <div key={idx} className={`${p.color} rounded-xl p-3 ${p.active ? 'ring-2 ring-white' : 'opacity-60'}`}>
            <div>{p.label}</div>
            <div className="text-xs font-normal opacity-80">{p.range}</div>
          </div>
        ))}
      </div>

      {/* TODAY’S CHALLENGE */}
      <div className="bg-lime-500/30 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-white/70 mb-1">{challenge.phase} ({challenge.range})</p>
        <h2 className="text-lg font-bold">{`Day ${dayNumber}: ${challenge.title}`}</h2>
        <p className="text-sm italic opacity-90 mt-1">{challenge.quote}</p>
      </div>

      {/* TODAY’S QUESTS */}
      <h3 className="text-lg font-bold mb-2 flex items-center">
        <Target className="w-5 h-5 mr-2" /> Today’s Quests
      </h3>

      {quests.map((t, i) => {
        const key = `${todayISO}_q_${i}`;
        const done = !!state.completedTasks[key];
        return (
          <div key={i} onClick={() => toggleQuest(i)}
            className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${
              done ? 'bg-green-600/25 line-through' : 'bg-white/10 hover:bg-white/20'
            }`}>
            <span className="flex-1 text-sm">{t}</span>
            {done
              ? <CheckCircle className="w-5 h-5 text-green-400" />
              : <Circle className="w-5 h-5 text-white/40" />}
          </div>
        );
      })}

      {/* ENCOURAGEMENT */}
      <div className="bg-white/10 rounded-xl p-4 mt-6 text-sm italic text-center">
        {tip}
      </div>

      {/* FOOTER */}
      <div className="text-center mt-6 text-xs opacity-70">
        Based on the 30-Day Self-Help Guide by the University of Notre Dame’s<br />
        <a
          href="https://mcwell.nd.edu/your-well-being/physical-well-being/drugs/marijuana-or-cannabis-sativa/quitting-marijuana-a-30-day-self-help-guide/"
          className="underline text-blue-300 hover:text-blue-200"
          target="_blank" rel="noopener noreferrer">
          McWell Student Well-Being Center
        </a>
      </div>
    </div>
  );
};

export default RecoveryQuestApp;
