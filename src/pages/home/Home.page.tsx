import { useCallback, useEffect, useState } from "react";
import "./Home.page.scss";
import { Alert, Button, Game, Numbers, StatusGame } from "../../components";
import { CellType, SudokuType } from "../../types";
import data from "../../data/sudoku-small.json";

const INITIAL_LIFES = 3;

export const HomePage = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>(
    undefined
  );

  const [sudoku, setSudoku] = useState<SudokuType | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(false);

  const [lifes, setLifes] = useState(INITIAL_LIFES);
  const [userLost, setUserLost] = useState(false);
  const [userWon, setUserWon] = useState(false);

  const onSelectNumberHandler = (number: number) => {
    setSelectedNumber(number);
  };

  const onSelectCellHandler = () => setSelectedNumber(undefined);

  const onErrorHandler = useCallback(() => {
    setLifes(prevLifes => {
      const newLifes = prevLifes - 1;
      setUserLost(newLifes === 0);
      return newLifes;
    });
  }, []);

  const onUserWonHandler = useCallback(() => {
    setUserWon(true);
  }, []);

  const onNewGameClickHandler = () => getRandomSudoku();

  useEffect(() => {
    setLifes(INITIAL_LIFES);
    setUserLost(false);
    setUserWon(false);
    setShowSolution(false);
  }, [sudoku]);

  const onShowSolutionClickHandler = () => setShowSolution(true);

  const getRandomSudoku = async () => {
    const index = Math.floor(Math.random() * data.length);
    const sudokuString = data[index];
    const [sudokuStringQuiz, sudokuStringSolution] = sudokuString.split(",");
    const cells: CellType[] = sudokuStringSolution.split("").map((s, i) => ({
      value: Number(s),
      fixed: sudokuStringQuiz[i] !== "0",
    }));
    const selectedSudoku: SudokuType = { cells: [...cells] };
    setSudoku(selectedSudoku);
  };

  const finished = userLost || userWon;
  
  return (
    <div className="HomePage">
      <div className="HomePage-game">
        {!sudoku && (
          <div className="HomePage-loading">
            <p>No sudoku selected</p>
          </div>
        )}
        {(!finished || showSolution) && sudoku && (
          <Game
            finished={finished}
            onUserWon={onUserWonHandler}
            onError={onErrorHandler}
            sudoku={sudoku}
            selectedNumber={selectedNumber}
            onSelectCell={onSelectCellHandler}
            showSolution={showSolution}
          />
        )}
        {userWon && <Alert variant="win">You win!</Alert>}
        {userLost && <Alert variant="lose">You lose!</Alert>}
      </div>
      <div className="HomePage-status">
        <StatusGame lifes={lifes} />
        <Numbers finished={finished} onSelect={onSelectNumberHandler} />
        <Button onClick={onNewGameClickHandler}>New game</Button>
        {!finished && (
          <Button onClick={onShowSolutionClickHandler}>Show solution</Button>
        )}
      </div>
    </div>
  );
};
