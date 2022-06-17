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
    style,
    maskType,
    type,
    theme,
    Icon,
    className,
    onChange,
    onClick,
    autoSize,
    onBlur,
    forwardedRef,
  } = props;

  const [state, dispatch] = useReducer(reducer, getMask, init);

  const imask = useIMask(state);
  const { value = "", setValue } = imask;
  console.log(value);

  // const ref = props.inputRef || imask.ref;
  const inputDivRef = useRef();

  useEffect(() => {
    maskType && dispatch({ type: maskType });

    const $input = (forwardedRef || imask.ref).current;
    if (theme && theme === "green") {
      $input.classList.add("input-box__current_dark");
    }

    const $div = inputDivRef.current;
    if (className) {
      $div.classList.add(...className.split(" "));
    }

    if (theme || type) {
      $div.classList.add(`input-box_${theme || type}`);
    }
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div ref={inputDivRef} style={style ? style : {}} className="input-box">
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        ref={forwardedRef}
        style={
          autoSize
            ? { width: value.length * 10, maxWidth: 200, minWidth: "1rem" }
            : {}
        }
        onBlur={onBlur}
        className="input-box__current"
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
