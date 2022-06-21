import { useEffect, useReducer, useRef } from "react";
import "./index.scss";

import { useIMask } from "react-imask";

import { getMask } from "./helpers";

const init = () => {
  return {};
};

const reducer = (state, action) => getMask(action.type);

export const Input = (props) => {
  const {
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
  } = props;

  const [state, dispatch] = useReducer(reducer, getMask, init);

  const imask = useIMask(state);
  const { value = "", setValue } = imask;

  const inputDivRef = useRef();
  const customDateInputRef = useRef();

  useEffect(() => {
    maskType && dispatch({ type: maskType });

    const $input = (customDateInputRef || imask.ref).current;
    if (theme && theme === "green") {
      $input.classList.add("discount-input-box__current_dark");
    }

    const $div = inputDivRef.current;
    if (className) {
      $div.classList.add(...className.split(" "));
    }

    if (label) {
      $div.style.flexDirection = "column";
      $input.style.width = "unset";
      $input.style.padding = "2px 16px 3px";
    }

    if (theme || type) {
      $div.classList.add(`discount-input-box_${theme || type}`);
    }

    if (autoSize) {
      $input.style.width = value.length * 10;
      $input.style.maxWidth = 200;
      $input.style.minWidth = "1rem";
    }
  }, []);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <div ref={inputDivRef} style={style} className="discount-input-box">
      {Icon && <img src={Icon} className="discount-input-box__icon" alt="Input Icon" />}

      {label && <div className="discount-input-box__label">{label}</div>}

      <input
        ref={customDateInputRef}
        onBlur={onBlur}
        className="discount-input-box__current"
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);

          if (typeof onChange === "function") onChange(value);
        }}
        onClick={onClick}
      />
    </div>
  );
};
