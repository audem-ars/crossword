import React from 'react';

const CrosswordClues = ({ acrossClues, downClues }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Across</h3>
        <ul className="space-y-2">
          {acrossClues.map((clue) => (
            <li key={clue.number}>
              <span className="font-bold">{clue.number}.</span> {clue.clue}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Down</h3>
        <ul className="space-y-2">
          {downClues.map((clue) => (
            <li key={clue.number}>
              <span className="font-bold">{clue.number}.</span> {clue.clue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrosswordClues;