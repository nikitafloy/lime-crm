/*
 *
 * Input с label
 * Input без label, модификатор light-green (салатовая обводка)
 * Input без label, модификатор gray (серый бэкграунд)
 *
 * */

import { useEffect, useReducer } from "react";
import "./index.css";

import { useIMask } from "react-imask";

import { getMask } from "./helpers";

const init = () => {
  return {};
};

const reducer = (state, action) => getMask(action.type);

export const Input = ({
  defaultValue,
  maskType,
  type,
  theme,
  Icon,
  className,
  onChange,
  onClick,
}) => {
  const [state, dispatch] = useReducer(reducer, getMask, init);

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(state);

  useEffect(() => maskType && dispatch({ type: maskType }), []);

  const inputBoxClasses = ["input-box"];
  const inputBoxCurrentClasses = ["input-box__current"];
  if (className) {
    inputBoxClasses.push(className);
  }

  if (theme) {
    inputBoxClasses.push(`input-box-${theme}`);

    if (theme === "green") {
      inputBoxCurrentClasses.push("input-box__current-dark");
    }
  }

  if (type) {
    inputBoxClasses.push(`input-box-${type}`);
  }

  return (
    <div className={inputBoxClasses.join(" ")}>
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        ref={ref}
        className={inputBoxCurrentClasses.join(" ")}
        value={value || defaultValue}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
          setValue(value);
          return onChange(value);
        }}
        onClick={onClick}
      />
    </div>
  );
};
