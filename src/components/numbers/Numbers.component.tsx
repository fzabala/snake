import "./Numbers.component.scss";
import { Button } from "../button";

type NumbersPropsType = {
  finished: boolean;
  onSelect: (number: number) => void;
};

export const Numbers = ({ finished, onSelect }: NumbersPropsType) => {
  const onClickHandler = (number: number) => {
    if (finished) return;
    onSelect(number);
  };
  return (
    <div className="Numbers">
      {new Array(9).fill(null).map((_, number) => (
        <Button
          key={`number-${number + 1}`}
          onClick={() => onClickHandler(number + 1)}
        >
          {number + 1}
        </Button>
      ))}
    </div>
  );
};
