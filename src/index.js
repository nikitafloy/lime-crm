import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import "./fonts.scss";

import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
 *
 * Попап боковой с анимацией
 * Попап выходит при клике добавить акцию
 * Сохранять в redux стейте - просто сохранять в массиве redux
 * Верстка на бэм с нуля
 *
 *
 * Отмеченные дни со скидкой отмечаются зеленым с галочкой
 *
 * */
