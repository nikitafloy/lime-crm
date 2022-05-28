/*
 *
 * Select с типом date
 * Select с выбором вариантов с label и без label, модификатор light-green
 * Select с иконкой слева и без иконки
 *
 * */

import "./index.css";

import ArrayIcon from "../../assets/icons/array.svg";

const mock = ["First", "Second", "Third", "Fourth", "Five"];

export const Select = ({ value, label, theme, className }) => {
  const selectBoxClasses = [className, "select-box"];
  const textClasses = ["select-box__text"];
  const selectBoxIconClasses = ["select-box__icon"];

  if (label) {
    textClasses.push("select-box__text-black", "select-box__text-sm");
    selectBoxIconClasses.push("select-box__icon-sm");
  }

  if (theme && theme === "green") {
    selectBoxClasses.push("select-box-green");
  }

  return (
    <div className={selectBoxClasses.join(" ")}>
      {label && <div className="select-box__label">{label}</div>}

      <div className="select-box__current" tabIndex="1">
        <div className="select-box__value">
          <p className={textClasses.join(" ")}>{value}</p>
        </div>
      </div>

      <ul className="select-box__list">
        {mock.map((item, index) => (
          <li key={index}>
            <label className="select-box__option">{item}</label>
          </li>
        ))}
      </ul>

      <img
        className={selectBoxIconClasses.join(" ")}
        src={ArrayIcon}
        alt="Array Icon"
      />
    </div>
  );
};
