import { useEffect, useRef } from "react";
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
  const ref = useRef();

  useEffect(() => {
    const $button = ref.current;
    if (className) {
      $button.classList.add(...className.split(" "));
    }

    if (theme) {
      $button.classList.add(`btn_${theme}`);
    }

    if (type) {
      $button.classList.add(`btn_${type}`);
    }
  }, []);

  return (
    <button ref={ref} className="btn" style={style} onClick={onClick}>
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
