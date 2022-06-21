import { forwardRef, useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);

  const textClasses = `discount-select-box__text ${
    label ? "discount-select-box__text_black discount-select-box__text_sm" : ""
  }`;

  const selectBoxIconClasses = `discount-select-box__icon ${
    label ? "discount-select-box__icon_sm" : ""
  }`;

  useEffect(() => {
    const $selectBox = selectBoxRef.current;
    if (className) {
      $selectBox.classList.add(...className.split(" "));
    }

    if (type) {
      $selectBox.classList.add(`discount-select-box_${type}`);
    }

    if (theme && theme === "green") {
      $selectBox.classList.add("discount-select-box_green");
    }
  }, []);

  return (
    <div ref={selectBoxRef} className="discount-select-box" onClick={onClick}>
      <div className="discount-select-box-inner">
        {label && <div className="discount-select-box__label">{label}</div>}

        <div
          className={`discount-select-box__current ${open ? "open" : ""}`}
          tabIndex="1"
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}
        >
          {LeftIcon && (
            <div className="discount-select-box__icon-left">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={LeftIcon}
              />
            </div>
          )}

          <div className="discount-select-box__value">
            <p className={textClasses}>{value}</p>
          </div>

          <InlineSVG
            element="div"
            style={{ display: "flex" }}
            className={selectBoxIconClasses}
            src={ArrayIcon}
          />
        </div>

        <ul className="discount-select-box__list">
          {variants.map((item, index) => (
            <li key={index} onClick={() => onChange(item)}>
              <label className="discount-select-box__option">{item}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Select = forwardRef((props, ref) => (
  <SelectComponent {...props} forwardedRef={ref} />
));
