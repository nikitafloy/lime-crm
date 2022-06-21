import { useEffect, useReducer, useRef } from "react";
import "./index.scss";

// Imask
import { useIMask } from "react-imask";

// Helpers
import { getMask } from "./helpers";

const init = () => {
  return {};
};

const reducer = (state, action) => getMask(action.type);

export const Input = ({
  defaultValue,
  style = {},
  maskType,
  type,
  label,
  theme,
  Icon,
  className,
  onChange,
  onClick,
  autoSize,
  onBlur,
}) => {
  const customDateInputRef = useRef();
  const [state, dispatch] = useReducer(reducer, getMask, init);

  const imask = useIMask(state);
  const { value = "", setValue } = imask;

  const inputBoxClasses = ["discount-input-box"];
  if (className) {
    inputBoxClasses.push(className);
  }

  if (theme || type) {
    inputBoxClasses.push(`discount-input-box_${theme || type}`);
  }
  const inputClasses = ["discount-input-box__current"];

  if (theme && theme === "green") {
    inputClasses.push("discount-input-box__current_dark");
  }

  let inputStyles = {};
  let inputBoxStyles = style;
  if (label) {
    inputStyles = { width: "unset", padding: "2px 16px 3px" };
    inputBoxStyles = { ...inputBoxStyles, flexDirection: "column" };
  }

  if (autoSize) {
    inputStyles = {
      ...inputStyles,
      width: value.length * 10,
      maxWidth: 200,
      minWidth: "1rem",
    };
  }

  useEffect(() => maskType && dispatch({ type: maskType }), []);
  useEffect(() => setValue(defaultValue), [defaultValue]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setValue(value);

    if (typeof onChange === "function") onChange(value);
  };

  return (
    <div className={inputBoxClasses.join(" ")} style={inputBoxStyles}>
      {Icon && (
        <img src={Icon} className="discount-input-box__icon" alt="Input Icon" />
      )}

      {label && <div className="discount-input-box__label">{label}</div>}

      <input
        ref={customDateInputRef}
        onBlur={onBlur}
        className={inputClasses.join(" ")}
        value={value}
        style={inputStyles}
        onChange={onChangeHandler}
        onClick={onClick}
      />
    </div>
  );
};
