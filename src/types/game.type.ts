import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, GAME_LEVEL_EASY, GAME_LEVEL_EXPERT, GAME_LEVEL_HARD, GAME_LEVEL_MEDIUM, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../constants";
export type SnakeDirectionType = typeof DIRECTION_UP | typeof DIRECTION_LEFT | typeof DIRECTION_DOWN | typeof DIRECTION_RIGHT;
export type SnakeKeysType = typeof KEY_UP | typeof KEY_LEFT | typeof KEY_DOWN | typeof KEY_RIGHT;
export type GameLevelType = typeof GAME_LEVEL_EASY | typeof GAME_LEVEL_MEDIUM | typeof GAME_LEVEL_HARD | typeof GAME_LEVEL_EXPERT;
export type KeysMapType = {
  [key in SnakeKeysType]: SnakeDirectionType;
}

export type NotAllowedDirectionChangesType = {
  [key in SnakeDirectionType]: SnakeDirectionType;
};
export type LevelTimingType = {
  [key in GameLevelType]: number;
};