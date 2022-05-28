/*
 *
 * Input с label
 * Input без label, модификатор light-green (салатовая обводка)
 * Input без label, модификатор gray (серый бэкграунд)
 *
 * */

import { useState } from "react";
import "./index.css";

import { useIMask } from "react-imask";

import { getMask } from "./helpers";

export const Input = ({
  defaultValue,
  type,
  theme,
  Icon,
  className,
  onChange,
}) => {
  const [opts] = useState(getMask(type));

  console.log(opts);

  const {
    ref,
    maskRef,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue,
    typedValue,
    setTypedValue,
  } = useIMask(opts);

  const inputBoxClasses = [className, "input-box"];
  const inputBoxCurrentClasses = ["input-box__current"];
  if (theme) {
    if (theme === "dark") {
      inputBoxClasses.push("input-box-dark");
      // inputBoxCurrentClasses.push("input-box__current-dark");
    }
    if (theme === "green") {
      inputBoxClasses.push("input-box-green");
      inputBoxCurrentClasses.push("input-box__current-dark");
      // inputBoxCurrentClasses.push("input-box__current-bold");
    }
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
      />
    </div>
  );
};
