import React from 'react';

const HungryCharacter = ({ state = 'idle', message = "I'm hungry... what can we cook?" }) => {
  const getEyes = () => {
    switch (state) {
      case 'typing':
        return (
          <div className="flex gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-dark/80 animate-bounce"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-dark/80 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          </div>
        );
      case 'searching':
        return (
          <div className="flex gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-dark/80 border-2 border-white/50 animate-spin"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-dark/80 border-2 border-white/50 animate-spin"></div>
          </div>
        );
      case 'success':
        return (
          <div className="flex gap-4">
            <span className="text-lg font-black text-dark/80 leading-none">^</span>
            <span className="text-lg font-black text-dark/80 leading-none">^</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex gap-4">
            <span className="text-base font-black text-dark/80 mx-0.5 opacity-70">×</span>
            <span className="text-base font-black text-dark/80 mx-0.5 opacity-70">×</span>
          </div>
        );
      default:
        return (
          <div className="flex gap-5">
            <div className="h-2 w-2 rounded-full bg-dark/70"></div>
            <div className="h-2 w-2 rounded-full bg-dark/70"></div>
          </div>
        );
    }
  };

  const getMouth = () => {
    switch (state) {
      case 'typing':
        return <div className="mt-1.5 h-2 w-6 rounded-full border-b-[3px] border-dark/60"></div>;
      case 'searching':
        return <div className="mt-2 h-3 w-3 rounded-full bg-dark/60 animate-pulse"></div>;
      case 'success':
        return <div className="mt-0.5 h-4 w-7 rounded-b-full bg-dark/80"></div>;
      case 'error':
        return <div className="mt-2.5 h-1 w-6 rounded-full bg-dark/50"></div>;
      default:
        return <div className="mt-2 h-0.5 w-4 rounded-full bg-dark/20"></div>;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Speech Bubble */}
      <div className="absolute -top-12 mb-4 animate-dashboard-enter">
        <div className="relative rounded-2xl bg-dark px-4 py-2 text-xs font-bold text-white shadow-xl after:absolute after:bottom-[-8px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-dark">
          {message}
        </div>
      </div>

      {/* Character Body (Yellow Circle) */}
      <div 
        className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-[#FFD700] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(255,215,0,0.2)] transition-all duration-500 ${
          state === 'success' ? 'animate-bounce scale-110 shadow-[0_30px_60px_rgba(255,215,0,0.4)]' : ''
        } ${state === 'error' ? 'translate-y-2 grayscale-[0.3]' : ''}`}
      >
        <div className="flex flex-col items-center">
          {getEyes()}
          {getMouth()}
        </div>

        {/* Blush */}
        {(state === 'typing' || state === 'success') && (
          <>
            <div className="absolute left-6 top-1/2 h-2 w-4 rounded-full bg-pink-400/30 blur-[2px]"></div>
            <div className="absolute right-6 top-1/2 h-2 w-4 rounded-full bg-pink-400/30 blur-[2px]"></div>
          </>
        )}
      </div>

      {/* Character Feet/Shadow */}
      <div className={`mt-4 h-2 w-16 rounded-full bg-dark/10 blur-[4px] transition-all duration-500 ${
        state === 'success' ? 'scale-150 opacity-40' : 'scale-100 opacity-100'
      }`}></div>
    </div>
  );
};

export default HungryCharacter;
