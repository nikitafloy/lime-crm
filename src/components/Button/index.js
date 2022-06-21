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
  const buttonClasses = ["discount-btn"];
  if (className) {
    buttonClasses.push(...className.split(" "));
  }

  if (theme) {
    buttonClasses.push(`discount-btn_${theme}`);
  }

  if (type) {
    buttonClasses.push(`discount-btn_${type}`);
  }

  return (
    <button className={buttonClasses.join(" ")} style={style} onClick={onClick}>
      {LeftIcon && (
        <div className="discount-btn__icon-left">
          <InlineSVG element="div" style={{ display: "flex" }} src={LeftIcon} />
        </div>
      )}

      {value && (
        <div className="discount-btn__text">
          {value}
          {secondText && <div className="discount-btn__second-text">{secondText}</div>}
        </div>
      )}
    </button>
  );
};
