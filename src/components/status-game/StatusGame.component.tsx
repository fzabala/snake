import "./StatusGame.component.scss";

type StatusGamePropsType = {
  lifes: number;
};

export const StatusGame = ({ lifes }: StatusGamePropsType) => {
  return (
    <div className="StatusGame">
      <p className="StatusGame-text">Lifes: {lifes}</p>
    </div>
  );
};
