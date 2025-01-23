import React, { useState, useEffect, useRef } from 'react';
import { vocabularyCategories } from '../data/VocabularyData';
import { achievementVocab } from '../data/VocabData2';
import { advancedVocab } from '../data/vocabdata3';
import { emotionalVocab } from '../data/VocabData4';
import puzzleGenerator from '../services/PuzzleGeneratorService';
import { useCellRevealAnimation, useSuccessAnimation, animationClasses } from '../utils/animations';
import WaterFlame from './WaterFlame';
import '../styles/waterFlame.css';
import OceanWaves from './OceanWaves';
import '../styles/OceanWaves.css';

const CrosswordPuzzle = () => {
  const [grid, setGrid] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [acrossClues, setAcrossClues] = useState([]);
  const [downClues, setDownClues] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const inputRefs = useRef({});
  const { revealedCells, animateCellReveal } = useCellRevealAnimation(completed);
  const showCelebration = useSuccessAnimation(completed);

  const puzzleConfig = {
    width: 15,
    height: 15,
    words: []
  };

  const getAllVocabulary = () => {
    const allWords = [];
    
    // Add words from vocabularyCategories
    Object.values(vocabularyCategories).forEach(category => {
      category.words.forEach(word => {
        allWords.push({
          word: word.word,
          clue: word.clue,
          difficulty: word.difficulty
        });
      });
    });

    // Add words from achievementVocab
    Object.values(achievementVocab).forEach(category => {
      category.forEach(word => {
        allWords.push({
          word: word.word,
          clue: word.clue,
          difficulty: word.difficulty
        });
      });
    });

    // Add words from advancedVocab
    Object.values(advancedVocab).forEach(category => {
      category.words?.forEach(word => {
        allWords.push({
          word: word.word,
          clue: word.clue,
          difficulty: word.difficulty
        });
      });
    });

    // Add words from emotionalVocab
    Object.values(emotionalVocab).forEach(category => {
      category.words.forEach(word => {
        allWords.push({
          word: word.word,
          clue: word.clue,
          difficulty: word.difficulty
        });
      });
    });

    return allWords;
  };

  const findValidPositions = (word, placedWords) => {
    const positions = [];
    const gridSize = 15;
    
    ['across', 'down'].forEach(direction => {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (canPlaceWord(word, x, y, direction, placedWords, gridSize)) {
            positions.push({ x, y, direction });
          }
        }
      }
    });
    
    return positions;
  };
  
  const canPlaceWord = (word, x, y, direction, placedWords, gridSize) => {
    if (direction === 'across' && x + word.length > gridSize) return false;
    if (direction === 'down' && y + word.length > gridSize) return false;
    
    for (let i = 0; i < word.length; i++) {
      const currX = direction === 'across' ? x + i : x;
      const currY = direction === 'down' ? y + i : y;
      
      let hasIntersection = false;
      let isValid = true;
      
      placedWords.forEach(placedWord => {
        for (let j = 0; j < placedWord.word.length; j++) {
          const px = placedWord.direction === 'across' ? placedWord.x + j : placedWord.x;
          const py = placedWord.direction === 'down' ? placedWord.y + j : placedWord.y;
          
          if (px === currX && py === currY) {
            if (word[i] !== placedWord.word[j]) {
              isValid = false;
            } else {
              hasIntersection = true;
            }
          }
        }
      });
      
      if (!isValid) return false;
      
      if (placedWords.length > 0 && i === word.length - 1 && !hasIntersection) {
        return false;
      }
    }
    
    return true;
  };
  
  const generatePuzzleConfig = () => {
    const allVocabulary = getAllVocabulary();
    const selectedWords = [];
    const usedWords = new Set();
    
    for (let i = 0; i < 20; i++) {
      let attempts = 0;
      let wordAdded = false;
      
      while (attempts < 50 && !wordAdded) {
        const randomWord = allVocabulary[Math.floor(Math.random() * allVocabulary.length)];
        
        if (randomWord.word.length > 14 || usedWords.has(randomWord.word)) {
          attempts++;
          continue;
        }
        
        const positions = findValidPositions(randomWord.word, selectedWords);
        if (positions.length > 0) {
          const position = positions[Math.floor(Math.random() * positions.length)];
          selectedWords.push({
            word: randomWord.word.toUpperCase(),
            clue: randomWord.clue,
            x: position.x,
            y: position.y,
            direction: position.direction
          });
          usedWords.add(randomWord.word);
          wordAdded = true;
        }
        
        attempts++;
      }
    }
  
    return {
      width: 15,
      height: 15,
      words: selectedWords
    };
  };

  useEffect(() => {
    const newConfig = generatePuzzleConfig();
    initializeGrid(newConfig);
    organizeClues(newConfig);
  }, []);

  const initializeGrid = (config) => {
    const newGrid = Array(config.height).fill(null).map(() =>
      Array(config.width).fill({ letter: '', number: null, isStart: false, empty: true })
    );

    let cellNumber = 1;
    config.words.forEach(({ word, x, y, direction }) => {
      if (direction === 'across') {
        for (let i = 0; i < word.length; i++) {
          newGrid[y][x + i] = {
            letter: word[i],
            number: i === 0 ? cellNumber : null,
            isStart: i === 0,
            empty: false,
            wordId: `${cellNumber}-${direction}`,
            wordIndex: i
          };
        }
      } else {
        for (let i = 0; i < word.length; i++) {
          newGrid[y + i][x] = {
            letter: word[i],
            number: i === 0 ? cellNumber : null,
            isStart: i === 0,
            empty: false,
            wordId: `${cellNumber}-${direction}`,
            wordIndex: i
          };
        }
      }
      cellNumber++;
    });
    setGrid(newGrid);
  };

  const organizeClues = (config) => {
    const across = [];
    const down = [];
    let number = 1;
    config.words.forEach(word => {
      const clueObj = {
        number,
        clue: word.clue,
        word: word.word,
        direction: word.direction,
        x: word.x,
        y: word.y
      };
      if (word.direction === 'across') {
        across.push(clueObj);
      } else {
        down.push(clueObj);
      }
      number++;
    });
    setAcrossClues(across);
    setDownClues(down);
  };

  const handleNewPuzzle = () => {
    const newPuzzleConfig = generatePuzzleConfig(); // Use our new function directly
    initializeGrid(newPuzzleConfig);
    organizeClues(newPuzzleConfig);
    setUserInputs({});
    setCompleted(false);
};

  const handleClueClick = (clue) => {
    const key = `${clue.y}-${clue.x}`;
    if (inputRefs.current[key]) {
      inputRefs.current[key].focus();
    }
    setSelectedWord({
      number: clue.number,
      direction: clue.direction,
      word: clue.word
    });
  };

  const handleCellInput = (y, x, value, cell) => {
    const newInputs = { ...userInputs };
    newInputs[`${y}-${x}`] = value.toUpperCase();
    setUserInputs(newInputs);
    
    // Move to next cell
    const nextCell = findNextCell(y, x, selectedWord?.direction);
    if (nextCell && inputRefs.current[`${nextCell.y}-${nextCell.x}`]) {
      inputRefs.current[`${nextCell.y}-${nextCell.x}`].focus();
    }
    
    checkCompletion(newInputs);
  };

  const findNextCell = (y, x, direction) => {
    if (!direction) return null;
    if (direction === 'across' && x < puzzleConfig.width - 1) {
      return { y, x: x + 1 };
    } else if (direction === 'down' && y < puzzleConfig.height - 1) {
      return { y: y + 1, x };
    }
    return null;
  };

  const handleKeyDown = (e, y, x, cell) => {
    if (e.key === 'Backspace' && !userInputs[`${y}-${x}`]) {
      e.preventDefault();
      const prevCell = findPreviousCell(y, x, selectedWord?.direction);
      if (prevCell) {
        const key = `${prevCell.y}-${prevCell.x}`;
        setUserInputs(inputs => ({ ...inputs, [key]: '' }));
        inputRefs.current[key]?.focus();
      }
    } else if (e.key === 'Enter') {
      setSelectedWord(prev => ({
        ...prev,
        direction: prev?.direction === 'across' ? 'down' : 'across'
      }));
    }
  };

  const findPreviousCell = (y, x, direction) => {
    if (!direction) return null;
    if (direction === 'across' && x > 0) {
      return { y, x: x - 1 };
    } else if (direction === 'down' && y > 0) {
      return { y: y - 1, x };
    }
    return null;
  };

  const checkCompletion = (inputs) => {
    let isComplete = true;
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell.empty && inputs[`${y}-${x}`] !== cell.letter) {
          isComplete = false;
        }
      });
    });
    setCompleted(isComplete);
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-800 p-4 relative">
  <OceanWaves className="opacity-50" />
  <div className="bg-transparent rounded-lg shadow-lg p-6 max-w-7xl mx-auto relative z-10">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Crossword</h2>
          <div className="flex gap-2">
            <button
              onClick={handleNewPuzzle}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              New Puzzle
            </button>
            <button
              onClick={() => setShowHints(!showHints)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
        </div>
        <div className="grid gap-0 border-2 border-gray-300 p-4 rounded bg-white">
          {grid.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className={`w-10 h-10 border border-gray-300 relative ${
                    cell.empty ? 'water-flame-cell' : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  {cell.empty ? (
                    <WaterFlame />
                  ) : (
                    <>
                      {cell.number && (
                        <span className="absolute text-xs top-0 left-0 z-10 text-gray-600">
                          {cell.number}
                        </span>
                      )}
                      <input
                        ref={el => inputRefs.current[`${y}-${x}`] = el}
                        type="text"
                        maxLength="1"
                        className="w-full h-full text-center p-0 border-0 outline-none focus:bg-blue-100"
                        value={userInputs[`${y}-${x}`] || ''}
                        onChange={(e) => handleCellInput(y, x, e.target.value, cell)}
                        onKeyDown={(e) => handleKeyDown(e, y, x, cell)}
                        onClick={() => {
                          const word = puzzleConfig.words.find(w => 
                            (w.direction === 'across' && w.y === y && x >= w.x && x < w.x + w.word.length) ||
                            (w.direction === 'down' && w.x === x && y >= w.y && y < w.y + w.word.length)
                          );
                          if (word) {
                            setSelectedWord({
                              number: cell.number,
                              direction: word.direction,
                              word: word.word
                            });
                          }
                        }}
                      />
                      {showHints && !userInputs[`${y}-${x}`] && (
                        <span className="absolute inset-0 flex items-center justify-center text-gray-400">
                          {cell.letter}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {completed && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-500">
            <h3 className="font-bold">🎉 Congratulations!</h3>
            <p>You've successfully completed the crossword puzzle!</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-white/95 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Across</h3>
          <ul className="space-y-2">
            {acrossClues.map((clue) => (
              <li
                key={clue.number}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  selectedWord?.number === clue.number && selectedWord?.direction === 'across'
                    ? 'bg-blue-200'
                    : ''
                }`}
                onClick={() => handleClueClick(clue)}
              >
                <span className="font-bold">{clue.number}.</span> {clue.clue}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/95 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Down</h3>
          <ul className="space-y-2">
            {downClues.map((clue) => (
              <li
                key={clue.number}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  selectedWord?.number === clue.number && selectedWord?.direction === 'down'
                    ? 'bg-blue-200'
                    : ''
                }`}
                onClick={() => handleClueClick(clue)}
              >
                <span className="font-bold">{clue.number}.</span> {clue.clue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default CrosswordPuzzle;