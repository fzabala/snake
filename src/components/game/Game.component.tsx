import { useEffect, useState } from "react";
import "./Game.component.scss";
import classNames from "classnames";
import { CellType, SudokuType } from "../../types";

type GamePropsType = {
  finished: boolean;
  sudoku: SudokuType;
  selectedNumber?: number;
  showSolution: boolean;
  onError: () => void;
  onUserWon: () => void;
  onSelectCell: () => void;
};

const GRID_WIDTH = 9;
const GRID_HEIGHT = 9;

export const Game = ({
  finished,
  sudoku,
  selectedNumber,
  showSolution,
  onError,
  onUserWon,
  onSelectCell,
}: GamePropsType) => {
  const [selectedIndexCell, setSelectedIndexCell] = useState<
    number | undefined
  >(undefined);
  const [solvedSudoku, setSolvedSudoku] = useState<SudokuType | undefined>(
    undefined
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setSolvedSudoku(sudoku);
  }, [sudoku]);

  useEffect(() => {
    if (!selectedIndexCell || !selectedNumber) return;
    if (solvedSudoku?.cells[selectedIndexCell].value !== selectedNumber) {
      setIsError(true);
      onError();
      return;
    }

    solvedSudoku.cells[selectedIndexCell].solved = true;

    setSolvedSudoku({ ...solvedSudoku });
    setSelectedIndexCell(undefined);
  }, [selectedNumber, selectedIndexCell, solvedSudoku, onError]);

  useEffect(() => {
    console.log("Sudoku updated:", sudoku.cells[0]);
  }, [sudoku]);

  const onSelectHandler = (index: number) => {
    onSelectCell();
    if (finished) return;
    if (
      !solvedSudoku?.cells[index].fixed &&
      !solvedSudoku?.cells[index].solved
    ) {
      setIsError(false);
      setSelectedIndexCell(index === selectedIndexCell ? undefined : index);
    }
  };

  useEffect(() => {
    if (solvedSudoku) {
      const userWon =
        solvedSudoku.cells.filter((cell: CellType) => cell.fixed || cell.solved)
          .length === solvedSudoku.cells.length;
      if (userWon) onUserWon();
    }
  }, [solvedSudoku, onUserWon]);

  useEffect(() => {
    if (showSolution && !finished && solvedSudoku) {
      const solvedSudokuCells = solvedSudoku.cells.map((cell) => ({
        ...cell,
        solved: true,
      }));

      setSolvedSudoku({
        ...solvedSudoku,
        cells: solvedSudokuCells,
      });
    }
  }, [showSolution, solvedSudoku, finished]);

  if (!solvedSudoku) return null;

  return (
    <div className="Game">
      {new Array(GRID_WIDTH * GRID_HEIGHT)
        .fill(null)
        .map((_, index: number) => (
          <GameCell
            key={`game-cell-${index}`}
            selected={
              typeof selectedIndexCell !== "undefined"
                ? solvedSudoku?.cells[selectedIndexCell]
                : undefined
            }
            isError={isError && selectedIndexCell === index}
            onSelect={() => onSelectHandler(index)}
            gameCell={solvedSudoku.cells[index]}
          />
        ))}
    </div>
  );
};

type GameCellPropsType = {
  gameCell: CellType;
  onSelect: () => void;
  selected?: CellType;
  isError: boolean;
};

export const GameCell = ({
  gameCell,
  onSelect,
  selected,
  isError,
}: GameCellPropsType) => {
  return (
    <div
      onClick={onSelect}
      className={classNames("Game-cell", {
        "Game-cell--fixed": gameCell.fixed,
        "Game-cell--selected": gameCell === selected,
        "Game-cell--error": isError,
      })}
    >
      {gameCell.solved || gameCell.fixed ? gameCell.value : ""}
    </div>
  );
};
