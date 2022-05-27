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

export const Select = ({ value, label, type }) => {
  const selectBoxClasses = ["select-box"];
  const textClasses = ["select-box__text"];
  const selectBoxIconClasses = ["select-box__icon"];

  if (label) {
    textClasses.push("select-box__text-black", "select-box__text-sm");
    selectBoxIconClasses.push("select-box__icon-sm");
  }

  if (type && type === "green") {
    selectBoxClasses.push("select-box-green");
  }

  return (
    <div className={selectBoxClasses.join(" ")}>
      {label && <div className="select-box__label">{label}</div>}

      <div className="select-box__current" tabIndex="1">
        <div className="select-box__value">
          <p className={textClasses.join(" ")}>{value}</p>
        </div>

        <ul className="select-box__list">
          {mock.map((item, index) => (
            <li key={index}>
              <label className="select-box__option">{item}</label>
            </li>
          ))}
        </ul>
      </div>

      <img
        className={selectBoxIconClasses.join(" ")}
        src={ArrayIcon}
        alt="Array Icon"
      />
    </div>
  );
};
