import { forwardRef, useEffect, useRef } from "react";
import "./index.scss";

// Icons
import { ArrayIcon } from "../../assets/icons";

// Inline SVG
import InlineSVG from "svg-inline-react";

const SelectComponent = ({
  value,
  type,
  variants = [],
  label,
  theme,
  className,
  LeftIcon,
  onChange,
  onClick,
}) => {
  const selectBoxRef = useRef();

  const textClasses = `select-box__text ${
    label ? "select-box__text_black select-box__text_sm" : ""
  }`;

  const selectBoxIconClasses = `select-box__icon ${
    label ? "select-box__icon_sm" : ""
  }`;

  useEffect(() => {
    const $selectBox = selectBoxRef.current;
    if (className) {
      $selectBox.classList.add(...className.split(" "));
    }

    if (type) {
      $selectBox.classList.add(`select-box_${type}`);
    }

    if (theme && theme === "green") {
      $selectBox.classList.add("select-box_green");
    }
  }, []);

  return (
    <div ref={selectBoxRef} className="select-box" onClick={onClick}>
      {label && <div className="select-box__label">{label}</div>}

      <div className="select-box__current" tabIndex="1">
        {LeftIcon && (
          <div className="select-box__icon-left">
            <InlineSVG src={LeftIcon} />
          </div>
        )}

        <div className="select-box__value">
          <p className={textClasses}>{value}</p>
        </div>

        <InlineSVG className={selectBoxIconClasses} src={ArrayIcon} />
      </div>

      <ul className="select-box__list">
        {variants.map((item, index) => (
          <li key={index} onClick={() => onChange(item)}>
            <label className="select-box__option">{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Select = forwardRef((props, ref) => (
  <SelectComponent {...props} forwardedRef={ref} />
));
