import "./index.scss";

import InlineSVG from "svg-inline-react";

export const Button = ({
  style,
  value,
  type,
  theme,
  LeftIcon,
  secondText,
  className,
  onClick,
}) => {
  const buttonClasses = ["btn"];
  if (className) {
    buttonClasses.push(...className.split(" "));
  }

  if (theme) {
    buttonClasses.push(`btn_${theme}`);
  }

  if (type) {
    buttonClasses.push(`btn_${type}`);
  }

  return (
    <button className={buttonClasses.join(" ")} style={style} onClick={onClick}>
      {LeftIcon && (
        <div className="btn__icon-left">
          <InlineSVG element="div" style={{ display: "flex" }} src={LeftIcon} />
        </div>
      )}

      {value && (
        <div className="btn__text">
          {value}
          {secondText && <div className="btn__second-text">{secondText}</div>}
        </div>
      )}
    </button>
  );
};
