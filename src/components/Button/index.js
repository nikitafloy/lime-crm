/*
 * default (bg: #FFFFFF, color: #999999)
 * gray (bg: #F2F2F2, color: #868686)
 * dark-gray (bg: #E4E4E4, color: #222222B2)
 * green (bg: #7CCE04, color: #FFFFFF)
 * light-yellow-green (bg: #EEF3E0, color: #868686)
 * light-green (bg: #A1D214, color: #FFFFFF)
 * disabled (opacity 0.5)
 * red (bg: #FF5C00, color: #FFFFFF)
 * (24x24)
 * sm (148x40)
 * lg (128x40)
 * */

import "./index.css";

export const Button = ({ value, theme }) => {
  const btnClasses = ["btn"];
  if (theme) {
    if (theme === "green") {
      btnClasses.push("btn-green");
    }
    if (theme === "gray") {
      btnClasses.push("btn-gray");
    }
    if (theme === "black") {
      btnClasses.push("btn-black");
    }
  }

  return <button className={btnClasses.join(" ")}>{value}</button>;
};
