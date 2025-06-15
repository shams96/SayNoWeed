import React, { useState } from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

const MoodTracker = ({ onSave }) => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const moods = [
    { id: 'happy', icon: <Smile className="w-8 h-8 text-yellow-400" />, label: 'Positive' },
    { id: 'neutral', icon: <Meh className="w-8 h-8 text-gray-400" />, label: 'Neutral' },
    { id: 'sad', icon: <Frown className="w-8 h-8 text-blue-400" />, label: 'Struggling' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ mood, note, date: new Date().toISOString().split('T')[0] });
    setMood('');
    setNote('');
  };

  return (
    <div className="p-4 bg-white/10 rounded-xl border border-white/20">
      <h3 className="font-bold mb-3">How are you feeling today?</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-around mb-4">
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMood(m.id)}
              className={`flex flex-col items-center p-2 rounded-lg ${
                mood === m.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              {m.icon}
              <span className="text-xs mt-1">{m.label}</span>
            </button>
          ))}
        </div>
        
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Share more about your day..."
          className="w-full p-2 bg-white/10 rounded text-white placeholder-gray-300"
          rows="2"
        />
        
        <button
          type="submit"
          disabled={!mood}
          className="mt-3 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
        >
          Save Mood
        </button>
      </form>
    </div>
  );
};

export default MoodTracker;
