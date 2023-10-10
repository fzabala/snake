import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, GAME_HEIGHT, GAME_LEVEL_EASY, GAME_LEVEL_EXPERT, GAME_LEVEL_HARD, GAME_LEVEL_MEDIUM, GAME_WIDTH, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../../constants";
import { BlockType, GameLevelType, KeysMapType, LevelTimingType, NotAllowedDirectionChangesType, SnakeDirectionType, SnakeKeysType, SnakeType } from "../../types";

const generateFruit = (snake: SnakeType) => {
  const isCollision = (x: number, y: number) => {
    return snake.blocks.some((b) => b.x === x && b.y === y);
  }

  let xFruit: number;
  let yFruit: number;
  let collidedBlock: boolean;
  
  do {
    xFruit = Math.floor(Math.random() * GAME_WIDTH);
    yFruit = Math.floor(Math.random() * GAME_HEIGHT);
    collidedBlock = isCollision(xFruit, yFruit);
} while (collidedBlock);
  return {
    x: xFruit,
    y: yFruit,
    fillColor: FRUIT_FILL_COLOR,
    strokeStyle: FRUIT_STROKE_COLOR,
  };
};

const KEYS_MAP: KeysMapType = {
  [KEY_UP]: DIRECTION_UP,
  [KEY_LEFT]: DIRECTION_LEFT,
  [KEY_DOWN]: DIRECTION_DOWN,
  [KEY_RIGHT]: DIRECTION_RIGHT,
}

const NOT_ALLOWED_DIRECTION_CHANGES: NotAllowedDirectionChangesType = {
  [DIRECTION_UP]: DIRECTION_DOWN,
  [DIRECTION_DOWN]: DIRECTION_UP,
  [DIRECTION_LEFT]: DIRECTION_RIGHT,
  [DIRECTION_RIGHT]: DIRECTION_LEFT,
}

const LEVEL_TIMING: LevelTimingType = {
  [GAME_LEVEL_EASY]: 600,
  [GAME_LEVEL_MEDIUM]: 300,
  [GAME_LEVEL_HARD]: 100,
  [GAME_LEVEL_EXPERT]: 50,
}

interface SnakeState {
  snake: SnakeType;
  direction: SnakeDirectionType;
  fruit: BlockType;
  isGameOver: boolean;
  locked: boolean;
  level?: GameLevelType;
  timing?: number;
}

const SNAKE_FILL_COLOR = "#39a811";
const SNAKE_STROKE_COLOR = "#333";
const FRUIT_FILL_COLOR = "#a83911";
const FRUIT_STROKE_COLOR = "#333";

const INITIAL_SNAKE: SnakeType = {
  blocks: [{
    x: 20,
    y: 5,
    fillColor: SNAKE_FILL_COLOR,
    strokeStyle: SNAKE_STROKE_COLOR,
  },{
    x: 21,
    y: 5,
    fillColor: SNAKE_FILL_COLOR,
    strokeStyle: SNAKE_STROKE_COLOR,
  },{
    x: 22,
    y: 5,
    fillColor: SNAKE_FILL_COLOR,
    strokeStyle: SNAKE_STROKE_COLOR,
  },{
    x: 23,
    y: 5,
    fillColor: SNAKE_FILL_COLOR,
    strokeStyle: SNAKE_STROKE_COLOR,
  }]
}

const initialState: SnakeState = {
  snake: INITIAL_SNAKE,
  direction: DIRECTION_RIGHT,
  fruit: generateFruit(INITIAL_SNAKE),
  isGameOver: false,
  locked: false,
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    animateSnake(state) {
      state.locked = false;
      const lastBlock = {...state.snake.blocks[state.snake.blocks.length - 1]};

      switch(state.direction){
        case DIRECTION_RIGHT: {
           lastBlock.x = (lastBlock.x + 1) % GAME_WIDTH;
          break;
        }
        case DIRECTION_DOWN: {
          lastBlock.y = (lastBlock.y + 1) % GAME_HEIGHT;
          break;
        }
        case DIRECTION_UP: {
          lastBlock.y = lastBlock.y === 0 ? (GAME_HEIGHT - 1) : (lastBlock.y - 1);
          break;
        }
        case DIRECTION_LEFT: {
          lastBlock.x = lastBlock.x === 0 ? (GAME_WIDTH - 1) : (lastBlock.x - 1);
          break;
        }
      }

      //adds the fruit to the snake
      if(state.fruit.x === lastBlock.x && state.fruit.y === lastBlock.y){
        state.snake.blocks.push({
          x: state.fruit.x,
          y: state.fruit.y,
          fillColor: SNAKE_FILL_COLOR,
          strokeStyle: SNAKE_STROKE_COLOR,
        });
        state.fruit = generateFruit(state.snake);
      } else {
        for(let index = 0; index < state.snake.blocks.length - 1; index++){
          state.snake.blocks[index] = state.snake.blocks[index + 1];
        }
        state.snake.blocks[state.snake.blocks.length - 1] = lastBlock;
      }

      // checks if snake eats itself
      const flattenBlocks = state.snake.blocks.map(b => `x:${b.x}-y:${b.y}`);
      const collidedBlocks = flattenBlocks.filter((item, index) => flattenBlocks.indexOf(item) !== index);
      if(collidedBlocks.length !== 0) {
        state.isGameOver = true
      };
    },
    changeDirection(state, action: PayloadAction<SnakeKeysType>) {
      if (NOT_ALLOWED_DIRECTION_CHANGES[state.direction] !== KEYS_MAP[action.payload] && KEYS_MAP[action.payload] && !state.locked && !state.isGameOver){
        state.direction = KEYS_MAP[action.payload]
      }
    },
    startGame(state, action: PayloadAction<GameLevelType>) {
      state.level = action.payload;
      state.timing = LEVEL_TIMING[action.payload];
    },
  },
});

export const { animateSnake, changeDirection, startGame } = snakeSlice.actions
