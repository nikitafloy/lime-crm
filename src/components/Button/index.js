/*
 * default (bg: #FFFFFF, color: #999999)
 * gray (bg: #F2F2F2, color: #868686)
 * dark-gray (bg: #E4E4E4, color: #222222B2)
 * green (bg: #7CCE04, color: #FFFFFF)
 * light-yellow-green (bg: #EEF3E0, color: #868686)
 * light-green (bg: #A1D214, color: #FFFFFF)
 * disabled (opacity 0.5)
 * red (bg: #FF5C00, color: #FFFFFF)
 * (24x24)
 * sm (148x40)
 * lg (128x40)
 * */

import "./index.css";

import InlineSVG from "svg-inline-react";

export const Button = ({
  value,
  type,
  theme,
  LeftIcon,
  secondText,
  className,
  onClick,
}) => {
  const btnClasses = ["btn"];
  if (className) {
    btnClasses.push(className);
  }

  if (theme) {
    if (theme === "lighter-green") {
      btnClasses.push("btn-lighter-green");
    }
    if (theme === "light-green") {
      btnClasses.push("btn-light-green");
    }
    if (theme === "green") {
      btnClasses.push("btn-green");
    }
    if (theme === "light-gray") {
      btnClasses.push("btn-light-gray");
    }
    if (theme === "gray") {
      btnClasses.push("btn-gray");
    }
    if (theme === "black") {
      btnClasses.push("btn-black");
    }
  }

  if (type) {
    btnClasses.push(`btn-${type}`);
  }

  return (
    <button className={btnClasses.join(" ")} onClick={onClick}>
      {LeftIcon && (
        <div className="btn__icon-left">
          <InlineSVG src={LeftIcon} />
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
