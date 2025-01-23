export const generateCrosswordGrid = (puzzleData) => {
    const { width, height, words } = puzzleData;
    
    // Initialize empty grid
    const grid = Array(height).fill(null).map(() =>
      Array(width).fill({ letter: '', number: null, isStart: false })
    );
  
    // Place words on grid
    let cellNumber = 1;
    words.forEach(({ word, x, y, direction }) => {
      if (direction === 'across') {
        for (let i = 0; i < word.length; i++) {
          grid[y][x + i] = {
            letter: word[i],
            number: i === 0 ? cellNumber : null,
            isStart: i === 0,
            empty: false
          };
        }
      } else {
        for (let i = 0; i < word.length; i++) {
          grid[y + i][x] = {
            letter: word[i],
            number: i === 0 ? cellNumber : null,
            isStart: i === 0,
            empty: false
          };
        }
      }
      cellNumber++;
    });
  
    return grid;
  };
  
  export const organizeClues = (words) => {
    const across = [];
    const down = [];
    let number = 1;
  
    words.forEach(word => {
      const clueObj = {
        number,
        clue: word.clue,
        word: word.word
      };
  
      if (word.direction === 'across') {
        across.push(clueObj);
      } else {
        down.push(clueObj);
      }
      number++;
    });
  
    return { across, down };
  };