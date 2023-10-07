import "./Menu.component.scss";
import { Button } from "../button";

export const Menu = () => {

  return (
    <div className="Menu">
    <Button link href={'/play'}>New game</Button>
    <Button>Resume</Button>
    <Button>Options</Button>
    </div>
  );
};
