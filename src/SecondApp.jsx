import React from 'react';
import { Link } from 'react-router-dom';
import Sudoku from './components/Sudoku';

function SecondApp() {
  return (
    <div className="app min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-gray-900">
      <div className="relative">
        {/* Animated waves */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-40 animate-wave 
              bg-gradient-to-t from-purple-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-36 animate-wave-slow 
              bg-gradient-to-t from-purple-300 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 animate-wave-slower 
              bg-gradient-to-t from-purple-200 to-transparent opacity-10"></div>
        </div>

        {/* Back to Crossword link */}
        <div className="absolute top-4 left-4 z-20">
          <Link to="/" className="text-white hover:text-purple-200 transition-colors">
            ← Back to Crossword
          </Link>
        </div>

        {/* Sudoku content */}
        <div className="relative z-10">
          <Sudoku />
        </div>
      </div>
    </div>
  );
}

export default SecondApp;