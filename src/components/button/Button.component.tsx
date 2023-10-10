import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './Button.component.scss';
import classNames from 'classnames';

type ButtonVariantType = 'rounded' | 'square';

type ButtonPropsType = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: ButtonVariantType,
  link?: boolean,
}

export const Button = ({variant, link, children, ...props}: ButtonPropsType) => {
  props.className = classNames("Button", props.className, `Button-variant--${variant}`);
  const element = React.createElement(link ? 'a' : 'button', {
    children,
    ...props
  });
  return element;
};

Button.defaultProps = {
  variant: 'square',
  link: false,
}