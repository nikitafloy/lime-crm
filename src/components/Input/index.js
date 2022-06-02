import { useEffect, useReducer, useRef } from "react";
import "./index.scss";

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
  const { ref, value, setValue } = useIMask(state);
  const inputDivRef = useRef();

  useEffect(() => {
    maskType && dispatch({ type: maskType });

    const $input = ref.current;
    if (theme && theme === "green") {
      $input.classList.add("input-box__current_dark");
    }

    const $div = inputDivRef.current;
    if (className) {
      $div.classList.add(...className.split(" "));
    }

    if (theme) {
      $div.classList.add(`input-box_${theme}`);
    }

    if (type) {
      $div.classList.add(`input-box_${type}`);
    }
  }, []);

  return (
    <div ref={inputDivRef} className="input-box">
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        ref={ref}
        className="input-box__current"
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
