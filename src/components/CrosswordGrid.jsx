import React from 'react';
import { Input } from '@/components/ui/input';

const CrosswordGrid = ({ grid, userInputs, onCellInput }) => {
  return (
    <div className="grid gap-0">
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-8 h-8 border border-gray-300 relative ${
                cell.letter ? 'bg-white' : 'bg-gray-800'
              }`}
            >
              {cell.number && (
                <span className="absolute text-xs top-0 left-0">
                  {cell.number}
                </span>
              )}
              {cell.letter && (
                <Input
                  type="text"
                  maxLength="1"
                  className="w-full h-full text-center p-0 border-0"
                  value={userInputs[`${y}-${x}`] || ''}
                  onChange={(e) => onCellInput(y, x, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;