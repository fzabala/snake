import "./Home.page.scss";
import { Button, CanvasGame } from "../../components";
import { GAME_HEIGHT, GAME_WIDTH, GAME_LEVEL_EASY, GAME_LEVEL_MEDIUM, GAME_LEVEL_HARD, GAME_LEVEL_EXPERT } from "../../constants";
import { GameLevelType } from "../../types";
import { startGame, useAppDispatch, useAppSelector } from "../../store";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isGameOver, level } = useAppSelector(store => store.snake);
  const onClickLevelHandler = (level: GameLevelType) => {
    dispatch(startGame(level));
  }

  return (
    <div className="HomePage">
    {level && <CanvasGame width={GAME_WIDTH} height={GAME_HEIGHT} />}
      {isGameOver && <p className="HomePage-alert">Game over</p>}
      {(isGameOver || !level) && <div className="HomePage-buttons">
        <Button onClick={() => onClickLevelHandler(GAME_LEVEL_EASY)}>EASY</Button>
        <Button onClick={() => onClickLevelHandler(GAME_LEVEL_MEDIUM)}>MEDIUM</Button>
        <Button onClick={() => onClickLevelHandler(GAME_LEVEL_HARD)}>HARD</Button>
        <Button onClick={() => onClickLevelHandler(GAME_LEVEL_EXPERT)}>EXPERT</Button>
      </div>}
    </div>
  );
};