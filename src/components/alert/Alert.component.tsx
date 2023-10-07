import { PropsWithChildren } from "react";
import "./Alert.component.scss";

type VariantAlertType = 'win' | 'lose';

type AlertPropsType = PropsWithChildren & {
  variant: VariantAlertType
};

export const Alert = ({
  children,
  variant
}: AlertPropsType) => {

  return (
    <div className={`Alert Alert-variant--${variant}`}>{children}</div>
  );
};
