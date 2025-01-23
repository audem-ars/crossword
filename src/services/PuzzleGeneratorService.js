import { vocabularyCategories } from '../data/VocabularyData';
import { achievementVocab } from '../data/VocabData2';
import { advancedVocab } from '../data/vocabdata3';
import { emotionalVocab } from '../data/VocabData4';

class PuzzleGeneratorService {
  constructor() {
    this.allWords = this.getAllVocabulary();
  }

  getAllVocabulary() {
    const allWords = [];
    
    // Collect words from all vocabulary sources
    [vocabularyCategories, achievementVocab, advancedVocab, emotionalVocab].forEach(vocabSource => {
      Object.values(vocabSource).forEach(category => {
        const words = category.words || category;
        if (Array.isArray(words)) {
          words.forEach(word => {
            if (typeof word === 'object' && word.word && word.clue) {
              allWords.push({
                word: word.word.toUpperCase(),
                clue: word.clue,
                difficulty: word.difficulty || 'medium'
              });
            }
          });
        }
      });
    });
    
    return allWords;
  }

  // Check if words can intersect at given positions
  canWordsIntersect(word1, x1, y1, isHorizontal1, word2, x2, y2, isHorizontal2) {
    if (isHorizontal1 === isHorizontal2) return false;
    
    if (isHorizontal1) {
      const intersectX = x2 - x1;
      const intersectY = y1 - y2;
      return (
        intersectX >= 0 &&
        intersectX < word1.length &&
        intersectY >= 0 &&
        intersectY < word2.length &&
        word1[intersectX] === word2[intersectY]
      );
    } else {
      const intersectX = x1 - x2;
      const intersectY = y2 - y1;
      return (
        intersectX >= 0 &&
        intersectX < word2.length &&
        intersectY >= 0 &&
        intersectY < word1.length &&
        word1[intersectY] === word2[intersectX]
      );
    }
  }

  generateNewPuzzle(width = 15, height = 15, wordCount = 5) {
    // Shuffle and get a subset of words
    const shuffledWords = [...this.allWords]
      .sort(() => Math.random() - 0.5)
      .filter(word => word.word.length <= Math.min(width, height));

    const placedWords = [];
    const grid = Array(height).fill().map(() => Array(width).fill(null));

    // Try to place words
    for (let i = 0; i < shuffledWords.length && placedWords.length < wordCount; i++) {
      const currentWord = shuffledWords[i].word;
      let placed = false;

      // Try different positions and orientations
      for (let y = 0; y < height && !placed; y++) {
        for (let x = 0; x < width && !placed; x++) {
          // Try horizontal placement
          if (this.canPlaceWord(grid, currentWord, x, y, true)) {
            this.placeWord(grid, currentWord, x, y, true);
            placedWords.push({
              word: currentWord,
              clue: shuffledWords[i].clue,
              x,
              y,
              direction: 'across'
            });
            placed = true;
          }
          // Try vertical placement
          else if (this.canPlaceWord(grid, currentWord, x, y, false)) {
            this.placeWord(grid, currentWord, x, y, false);
            placedWords.push({
              word: currentWord,
              clue: shuffledWords[i].clue,
              x,
              y,
              direction: 'down'
            });
            placed = true;
          }
        }
      }
    }

    return {
      width,
      height,
      words: placedWords
    };
  }

  canPlaceWord(grid, word, startX, startY, isHorizontal) {
    const height = grid.length;
    const width = grid[0].length;

    // Check if word fits within grid bounds
    if (isHorizontal) {
      if (startX + word.length > width) return false;
    } else {
      if (startY + word.length > height) return false;
    }

    // Check if placement is valid
    for (let i = 0; i < word.length; i++) {
      const x = isHorizontal ? startX + i : startX;
      const y = isHorizontal ? startY : startY + i;

      // Check if cell is empty or matches the letter
      if (grid[y][x] !== null && grid[y][x] !== word[i]) {
        return false;
      }

      // Check adjacent cells (except for intersections)
      if (grid[y][x] === null) {
        // Check cells above and below for horizontal words
        if (isHorizontal) {
          if (y > 0 && grid[y-1][x] !== null) return false;
          if (y < height-1 && grid[y+1][x] !== null) return false;
        }
        // Check cells to left and right for vertical words
        else {
          if (x > 0 && grid[y][x-1] !== null) return false;
          if (x < width-1 && grid[y][x+1] !== null) return false;
        }
      }
    }

    return true;
  }

  placeWord(grid, word, startX, startY, isHorizontal) {
    for (let i = 0; i < word.length; i++) {
      const x = isHorizontal ? startX + i : startX;
      const y = isHorizontal ? startY : startY + i;
      grid[y][x] = word[i];
    }
  }
}

export default new PuzzleGeneratorService();