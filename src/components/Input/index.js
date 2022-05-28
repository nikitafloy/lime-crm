/*
 *
 * Input с label
 * Input без label, модификатор light-green (салатовая обводка)
 * Input без label, модификатор gray (серый бэкграунд)
 *
 * */

import "./index.css";

export const Input = ({ value, type, theme, Icon, className, onChange }) => {
  const inputBoxClasses = [className, "input-box"];
  const inputBoxCurrentClasses = ["input-box__current"];
  if (theme) {
    if (theme === "dark") {
      inputBoxClasses.push("input-box-dark");
      // inputBoxCurrentClasses.push("input-box__current-dark");
    }
    if (theme === "green") {
      inputBoxClasses.push("input-box-green");
      inputBoxCurrentClasses.push("input-box__current-dark");
      // inputBoxCurrentClasses.push("input-box__current-bold");
    }
  }

  return (
    <div className={inputBoxClasses.join(" ")}>
      {Icon && <img src={Icon} className="input-box__icon" alt="Input Icon" />}

      <input
        className={inputBoxCurrentClasses.join(" ")}
        defaultValue={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};
