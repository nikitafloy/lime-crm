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

export const Select = () => {
  return (
    <div className="select-box">
      <div className="select-box__current" tabIndex="1">
        <div className="select-box__value">
          <p className="select-box__text">Value</p>
        </div>

        <img className="select-box__icon" src={ArrayIcon} alt="Array Icon" />

        <ul className="select-box__list">
          {mock.map((item, index) => (
            <li key={index}>
              <label className="select-box__option">{item}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
