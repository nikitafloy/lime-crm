import { useEffect, useState } from "react";
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
  const [classes, setClasses] = useState(["discount-btn"]);

  const updateClasses = (name) =>
    setClasses((prevState) => [...prevState, name]);

  useEffect(() => {
    if (className) {
      updateClasses(className);
    }

    if (theme) {
      updateClasses(`discount-btn_${theme}`);
    }

    if (type) {
      updateClasses(`discount-btn_${type}`);
    }
  }, [className, theme, type]);

  return (
    <button className={classes.join(" ")} style={style} onClick={onClick}>
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
