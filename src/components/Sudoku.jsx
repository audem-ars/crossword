import React, { useState } from 'react';

function Sudoku() {
  const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const [board, setBoard] = useState(initialPuzzle.map(row => row.map(cell => cell === 0 ? '' : cell.toString())));
  const [notes, setNotes] = useState(Array(9).fill().map(() => Array(9).fill().map(() => new Set())));
  const [selected, setSelected] = useState(null);
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [conflicts, setConflicts] = useState(new Set());

  const handleNoteInput = (value, rowIndex, colIndex) => {
    if (!isNoteMode || board[rowIndex][colIndex] || initialPuzzle[rowIndex][colIndex] !== 0) return;

    const newNotes = [...notes];
    newNotes[rowIndex] = [...notes[rowIndex]];
    const cellNotes = new Set(notes[rowIndex][colIndex]);

    if (cellNotes.has(value)) {
      cellNotes.delete(value);
    } else {
      cellNotes.add(value);
    }
    newNotes[rowIndex][colIndex] = cellNotes;
    setNotes(newNotes);
  };

  const handleInput = (value, rowIndex, colIndex) => {
    if (initialPuzzle[rowIndex][colIndex] !== 0) return;
    
    if (isNoteMode) {
      handleNoteInput(value, rowIndex, colIndex);
      return;
    }

    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newBoard = board.map(row => [...row]);
      newBoard[rowIndex][colIndex] = value;
      setBoard(newBoard);

      // Clear notes when setting a value
      const newNotes = [...notes];
      newNotes[rowIndex][colIndex] = new Set();
      setNotes(newNotes);

      updateConflicts(newBoard);
    }
  };

  const updateConflicts = (newBoard) => {
    const newConflicts = new Set();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newBoard[i][j] && !isValid(newBoard[i][j], i, j, newBoard)) {
          newConflicts.add(`${i}-${j}`);
        }
      }
    }
    setConflicts(newConflicts);
  };

  const isValid = (num, rowIndex, colIndex, currentBoard = board) => {
    for (let i = 0; i < 9; i++) {
      if (i !== colIndex && currentBoard[rowIndex][i] === num) return false;
      if (i !== rowIndex && currentBoard[i][colIndex] === num) return false;
    }

    const boxRow = Math.floor(rowIndex / 3) * 3;
    const boxCol = Math.floor(colIndex / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i !== rowIndex && j !== colIndex && currentBoard[i][j] === num) return false;
      }
    }
    return true;
  };

  const renderNotes = (rowIndex, colIndex) => {
    if (!notes[rowIndex][colIndex]) return null;
    
    return (
      <div className="grid grid-cols-3 grid-rows-3 absolute inset-0 pointer-events-none text-gray-400 text-[11px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <div key={num} className="flex items-center justify-center">
            {notes[rowIndex][colIndex].has(num.toString()) ? num : ''}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center pt-8">
      <h1 className="text-3xl font-bold text-white mb-4">Sudoku</h1>
      <button 
        className={`mb-4 px-4 py-2 rounded ${isNoteMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setIsNoteMode(!isNoteMode)}
      >
        {isNoteMode ? 'Notes Mode' : 'Normal Mode'}
      </button>
      <div className="grid grid-cols-9 gap-0 border-4 border-gray-800">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isPreFilled = initialPuzzle[rowIndex][colIndex] !== 0;
            return (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`
                  relative w-12 h-12
                  border border-gray-400
                  ${colIndex % 3 === 2 ? 'border-r-2' : ''}
                  ${rowIndex % 3 === 2 ? 'border-b-2' : ''}
                  ${conflicts.has(`${rowIndex}-${colIndex}`) ? 'bg-red-200' : 'bg-white'}
                  ${isPreFilled ? 'bg-gray-200' : ''}
                `}
                onClick={() => setSelected({ row: rowIndex, col: colIndex })}
              >
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleInput(e.target.value, rowIndex, colIndex)}
                  className={`
                    w-full h-full text-center text-xl font-semibold
                    focus:outline-none focus:bg-blue-100
                    ${isPreFilled ? 'font-bold' : ''}
                    ${conflicts.has(`${rowIndex}-${colIndex}`) ? 'text-red-600' : ''}
                    bg-transparent
                  `}
                  maxLength="1"
                  readOnly={isPreFilled}
                />
                {!cell && renderNotes(rowIndex, colIndex)}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}

export default Sudoku;