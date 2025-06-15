import React, { useState } from 'react';
import RecoveryQuest from './components/RecoveryQuest';
import QuittingChallenge from './components/QuittingChallenge';

function App() {
  const [activeTab, setActiveTab] = useState('recovery');

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-md mx-auto">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/20">
            <button
            onClick={() => setActiveTab('recovery')}
            className={`flex-1 py-4 text-center font-medium text-green-flash ${
              activeTab === 'recovery'
                ? 'border-b-2 border-green-flash'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            SayNoWeed
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'challenge' 
                ? 'border-b-2 border-lavender text-lavender' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            30-Day Quit Challenge
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {activeTab === 'recovery' && <RecoveryQuest />}
          {activeTab === 'challenge' && <QuittingChallenge />}
        </div>
      </div>
    </div>
  );
}

export default App;
