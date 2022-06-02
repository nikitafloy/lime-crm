/*
 *
 * Select с типом date
 * Select с выбором вариантов с label и без label, модификатор light-green
 * Select с иконкой слева и без иконки
 *
 * */

import { forwardRef } from "react";
import "./index.css";

import { ArrayIcon } from "../../assets/icons";
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
  const selectBoxClasses = ["select-box"];
  const textClasses = ["select-box__text"];
  const selectBoxIconClasses = ["select-box__icon"];

  if (className) {
    selectBoxClasses.push(className);
  }

  if (type) {
    selectBoxClasses.push(`select-box-${type}`);
  }

  if (label) {
    textClasses.push("select-box__text-black", "select-box__text-sm");
    selectBoxIconClasses.push("select-box__icon-sm");
  }

  if (theme && theme === "green") {
    selectBoxClasses.push("select-box-green");
  }

  return (
    <div className={selectBoxClasses.join(" ")} onClick={onClick}>
      {label && <div className="select-box__label">{label}</div>}

      <div className="select-box__current" tabIndex="1">
        {LeftIcon && (
          <div className="select-box__icon-left">
            <InlineSVG src={LeftIcon} />
          </div>
        )}

        <div className="select-box__value">
          <p className={textClasses.join(" ")}>{value}</p>
        </div>
      </div>

      <ul className="select-box__list">
        {variants.map((item, index) => (
          <li key={index} onClick={() => onChange(item)}>
            <label className="select-box__option">{item}</label>
          </li>
        ))}
      </ul>

      <InlineSVG className={selectBoxIconClasses.join(" ")} src={ArrayIcon} />
    </div>
  );
};

export const Select = forwardRef((props, ref) => (
  <SelectComponent {...props} forwardedRef={ref} />
));
