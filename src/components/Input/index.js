import { forwardRef, useEffect, useReducer, useRef } from "react";
import "./index.scss";

import { useIMask } from "react-imask";

import { getMask } from "./helpers";

const init = () => {
  return {};
};

const reducer = (state, action) => getMask(action.type);

export const Input = forwardRef((props, ref) => {
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
  } = props;

  const [state, dispatch] = useReducer(reducer, getMask, init);

  const imask = useIMask(state);
  const { value, setValue } = imask;

  // const ref = props.inputRef || imask.ref;
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

    if (theme || type) {
      $div.classList.add(`input-box_${theme || type}`);
    }
  }, []);

  return (
    <div ref={inputDivRef} style={style ? style : {}} className="input-box">
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        ref={ref}
        style={
          autoSize
            ? { width: (value || defaultValue).length * 10, maxWidth: 200 }
            : {}
        }
        onBlur={onBlur}
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
});
