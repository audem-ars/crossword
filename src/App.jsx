// src/App.jsx
import React from 'react';
import CrosswordPuzzle from './components/CrosswordPuzzle';

function App() {
  return (
    <div className="app min-h-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
      <div className="relative">
        {/* Animated waves */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[40vh] animate-wave 
            bg-gradient-to-t from-blue-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[35vh] animate-wave-slow 
            bg-gradient-to-t from-blue-300 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[30vh] animate-wave-slower 
            bg-gradient-to-t from-blue-200 to-transparent opacity-10"></div>
        </div>
        
        {/* Crossword content */}
        <div className="relative z-10">
          <CrosswordPuzzle />
        </div>
      </div>
    </div>
  );
}

export default App;