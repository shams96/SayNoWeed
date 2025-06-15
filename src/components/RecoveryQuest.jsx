import React, { useState, useEffect } from 'react';
import { Trophy, Heart, Target, Check } from 'lucide-react';

const RecoveryQuestApp = () => {
  // Initial quest data
  const [quests, setQuests] = useState([
    { id: 1, title: "Drink 6 glasses of water", xp: 10, completed: false },
    { id: 2, title: "Attend support meeting", xp: 20, completed: false },
    { id: 3, title: "Practice mindfulness for 10 mins", xp: 15, completed: false },
    { id: 4, title: "Reach out to a friend", xp: 15, completed: false },
  ]);
  
  const [xp, setXp] = useState(0);
  const level = Math.floor(xp / 100) + 1;
  const progress = (xp % 100) / 100;

  const [currentStreak, setCurrentStreak] = useState(() => {
    return parseInt(localStorage.getItem('recoveryCurrentStreak') || '0');
  });
  const [longestStreak, setLongestStreak] = useState(() => {
    return parseInt(localStorage.getItem('recoveryLongestStreak') || '0');
  });

  const [crisisNumber, setCrisisNumber] = useState(() => {
    return localStorage.getItem('crisisNumber') || '';
  });
  const [shareLocation, setShareLocation] = useState(false);

  useEffect(() => {
    localStorage.setItem('crisisNumber', crisisNumber);
  }, [crisisNumber]);

  const sendCrisisText = () => {
    let message = "I need support. Please call me.";
    if (shareLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          message += ` My location: https://maps.google.com/?q=${latitude},${longitude}`;
          window.location.href = `sms:${crisisNumber}?body=${encodeURIComponent(message)}`;
        }, (error) => {
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
          window.location.href = `sms:${crisisNumber}?body=${encodeURIComponent(message)}`;
        });
      } else {
        alert("Geolocation is not supported by your browser.");
        window.location.href = `sms:${crisisNumber}?body=${encodeURIComponent(message)}`;
      }
    } else {
      window.location.href = `sms:${crisisNumber}?body=${encodeURIComponent(message)}`;
    }
  };
  
  // Toggle quest completion
  const toggleQuest = (id) => {
    setQuests(prevQuests => prevQuests.map(quest => {
      if (quest.id === id) {
        const updated = {...quest, completed: !quest.completed};
        if (updated.completed) {
          setXp(prev => prev + quest.xp);
          // Update streak
          const newCurrentStreak = currentStreak + 1;
          setCurrentStreak(newCurrentStreak);
          if (newCurrentStreak > longestStreak) {
            setLongestStreak(newCurrentStreak);
          }
        } else {
          setXp(prev => prev - quest.xp);
          // Reset streak if uncompleted
          setCurrentStreak(0);
        }
        return updated;
      }
      return quest;
    }));
  };

  // Save streaks to localStorage
  useEffect(() => {
    localStorage.setItem('recoveryCurrentStreak', currentStreak.toString());
    localStorage.setItem('recoveryLongestStreak', longestStreak.toString());
  }, [currentStreak, longestStreak]);

  return (
    <div className="max-w-md mx-auto bg-dark-bg min-h-screen text-white p-4">
      <div className="p-6 text-center backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold flex items-center justify-center text-green-flash">
          <Trophy className="mr-2" /> SayNoWeed
        </h1>
        <p className="text-lg text-green-flash mt-2">Recovery Starts Here!</p>
        
        <div className="flex justify-center space-x-4 my-6">
          <div className="bg-white/10 p-3 rounded-xl min-w-[90px] text-center">
            <div className="text-2xl font-bold text-green-flash">{xp}</div>
            <div className="text-sm opacity-80">XP</div>
          </div>
          <div className="bg-white/10 p-3 rounded-xl min-w-[90px] text-center">
            <div className="text-2xl font-bold text-green-flash">Level {level}</div>
            <div className="text-sm opacity-80">Progress</div>
          </div>
          <div className="bg-white/10 p-3 rounded-xl min-w-[90px] text-center">
            <div className="text-2xl font-bold text-lavender">{currentStreak}</div>
            <div className="text-sm opacity-80">Streak</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-flash transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-4 mt-6 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center text-afterglow">
          <Target className="mr-2" /> Today's Quests
        </h2>
        
        <div className="space-y-3">
          {quests.map(quest => (
            <div 
              key={quest.id}
              className={`flex items-center p-4 rounded-xl transition-all duration-300 transform ${
                quest.completed 
                  ? 'bg-green-flash/20 border border-green-flash/30 scale-105 animate-pulse-once' 
                  : 'bg-white/10 border border-white/10 hover:scale-105'
              }`}
            >
              <div className="flex-1">
                <p className={quest.completed ? 'line-through opacity-70' : ''}>
                  {quest.title}
                </p>
                <p className="text-sm text-green-flash">+{quest.xp} XP</p>
              </div>
              <button 
                onClick={() => toggleQuest(quest.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  quest.completed 
                    ? 'bg-green-flash' 
                    : 'border-2 border-white/50 hover:border-white'
                }`}
              >
                {quest.completed && <Check size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 mt-6 backdrop-blur-sm bg-green-flash/20 rounded-2xl border border-white/10 shadow-xl">
        <h3 className="font-bold flex items-center text-afterglow">
          <Heart className="mr-2" /> Need Support?
        </h3>
        
        {/* Crisis Text Line */}
        <div className="mt-4">
          <label htmlFor="crisisNumber" className="block text-sm font-medium text-white/80">
            Crisis Contact Number:
          </label>
          <input
            type="tel"
            id="crisisNumber"
            className="w-full p-2 mt-1 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-afterglow"
            placeholder="e.g., 123-456-7890"
            value={crisisNumber}
            onChange={(e) => setCrisisNumber(e.target.value)}
          />
        </div>

        <div className="mt-3 flex items-center">
          <input
            type="checkbox"
            id="shareLocation"
            className="h-4 w-4 text-afterglow bg-gray-900 border-gray-700 rounded focus:ring-afterglow"
            checked={shareLocation}
            onChange={(e) => setShareLocation(e.target.checked)}
          />
          <label htmlFor="shareLocation" className="ml-2 text-sm text-white/80">
            Share my location
          </label>
        </div>

        <button
          onClick={sendCrisisText}
          className="w-full mt-4 py-3 rounded-xl flex items-center justify-center transition-all bg-afterglow hover:bg-afterglow/80 text-dark-bg font-bold"
        >
          Send Crisis Text
        </button>

        <p className="mt-4 text-sm opacity-90 text-green-flash">
          National Helpline: 1-800-662-HELP (4357)
        </p>
      </div>
    </div>
  );
};

export default RecoveryQuestApp;
