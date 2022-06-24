import { useEffect, useRef } from "react";
import "./index.scss";

import InlineSVG from "svg-inline-react";

const composeClassList = (className, theme, type) => {
  const classList = [];
  if (className) {
    classList.push(className.split(" "));
  }

  if (theme) {
    classList.push(`discount-btn_${theme}`);
  }

  if (type) {
    classList.push(`discount-btn_${type}`);
  }
  return classList;
};

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
    const classList = composeClassList(className, theme, type);
    if (classList) {
      $button.classList.add(...classList);
    }
  }, [className, theme, type]);

  return (
    <button
      ref={ref}
      className={"discount-btn"}
      style={style}
      onClick={onClick}
    >
      {LeftIcon && (
        <div className="discount-btn__icon-left">
          <InlineSVG element="div" style={{ display: "flex" }} src={LeftIcon} />
        </div>
      )}

      {value && (
        <div className="discount-btn__text">
          {value}
          {secondText && (
            <div className="discount-btn__second-text">{secondText}</div>
          )}
        </div>
      )}
    </button>
  );
};
