/*
 *
 * Input с label
 * Input без label, модификатор light-green (салатовая обводка)
 * Input без label, модификатор gray (серый бэкграунд)
 *
 * */

import "./index.css";

export const Input = ({ value, type, Icon }) => {
  const inputBoxClasses = ["input-box"];
  const inputBoxCurrentClasses = ["input-box__current"];
  if (type) {
    if (type === "dark") {
      inputBoxClasses.push("input-box-dark");
      inputBoxCurrentClasses.push("input-box__current-dark");
    }
    if (type === "green") {
      inputBoxClasses.push("input-box-green");
      inputBoxCurrentClasses.push("input-box__current-dark");
      inputBoxCurrentClasses.push("input-box__current-bold");
    }
  }

  return (
    <div className={inputBoxClasses.join(" ")}>
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        className={inputBoxCurrentClasses.join(" ")}
        defaultValue={value}
      />
    </div>
  );
};
