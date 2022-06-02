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
import { useEffect, useRef } from "react";

export const Button = ({
  value,
  type,
  theme,
  LeftIcon,
  secondText,
  className,
  onClick,
}) => {
  const ref = useRef();

  useEffect(() => {
    const $button = ref.current;
    if (className) {
      $button.classList.add(...className.split(" "));
    }

    if (theme) {
      $button.classList.add(`btn-${theme}`);
    }

    if (type) {
      $button.classList.add(`btn-${type}`);
    }
  }, []);

  return (
    <button ref={ref} className="btn" onClick={onClick}>
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
