import './Logo.component.scss';

type LogoPropsType = {
  text: string,
}

export const Logo = ({text}: LogoPropsType) => {
  return (
    <div className="Logo">
      {text.split('').map((l, i) => <Letter key={`letter-${l}-${i}`} letter={l} />)}
    </div>
  );
};

type LetterPropsType = {
  letter: string,
}

const Letter = ({letter}: LetterPropsType) => {
  return <div className="Logo-letter">
    {letter}
  </div>
}