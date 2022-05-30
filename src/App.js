import { Fragment } from "react";
import "./App.css";

import { Button, Drawer, Input, Select } from "./components";

import SearchIcon from "./assets/icons/search.svg";
import CalendarIcon from "./assets/icons/calendar.svg";
import TargetPoint from "./assets/icons/target_point.svg";
import PlayIcon from "./assets/icons/play.svg";
import PauseIcon from "./assets/icons/pause.svg";
import EditPencil from "./assets/icons/edit_pencil.svg";
import PlusIcon from "./assets/icons/plus.svg";
import CheckIcon from "./assets/icons/check.svg";

import mocks from "./__mocks__";

export const App = () => {
  const DrawDates = () =>
    mocks.dates.map(({ date, weekday }, index) => (
      <div key={index} className="main__board__header__dates">
        <div className="main__board__header__dates__date">{date}</div>
        <div className="main__board__header__dates__weekday">{weekday}</div>
      </div>
    ));

  const DrawActionData = () =>
    mocks.promos.map(({ name, status, promos }, index) => (
      <Fragment key={index}>
        <div className="main__board__left">
          <div className="main__board__icon">
            {status ? (
              <Button theme="green" value={<img src={PlayIcon} alt="Icon" />} />
            ) : (
              <Button theme="gray" value={<img src={PauseIcon} alt="Icon" />} />
            )}
          </div>
          <div className="main__board__name">{name}</div>
          <div className="main__board__icon">
            <img src={EditPencil} alt="Edit Pencil" />
          </div>
        </div>
        <div className="main__board__right">
          {promos.map((promo, index) => (
            <Button
              key={index}
              theme={promo.status ? "black" : "gray"}
              value={promo.status ? <img src={CheckIcon} alt="Check" /> : "н"}
            />
          ))}
        </div>
      </Fragment>
    ));

  return (
    <div className="App">
      <div className="main">
        <div className="main__header">
          <div className="main__header__left">
            <div className="main__header__left__top">
              <div className="main__header__left__stats main__header__left__stats-disabled">
                <div className="main__header__left__stats__name">Товары</div>
                <div className="main__header__left_stats__count">19783</div>
              </div>

              <div className="main__header__left__stats">
                <div className="main__header__left__stats__name">Скидки</div>
                <div className="main__header__left_stats__count">19783</div>
              </div>
            </div>

            <div className="main__header__left__bottom">
              <div className="main__header__left__bottom__icon">
                <img src={TargetPoint} alt="Target Point" />
              </div>
              <div className="main__header__left__bottom__address">
                г. Минск ул Беломорская дом 7
              </div>
            </div>
          </div>

          <div className="main__header__right">
            <button>Vladimirovna</button>
            <button>Ring</button>
          </div>
        </div>

        <div className="main__controls">
          <div className="main__controls__active">
            <button>Active</button>
            <button>No active</button>
          </div>

          <div className="main__controls__filters">
            <div className="main__controls__filters__type">type</div>
            <div className="main__controls__filters__discount">discount</div>
            <div className="main__controls__filters__period">period</div>
            <div className="main__controls__filters__category">category</div>
          </div>

          <div className="main__controls__search">search</div>
        </div>

        <div className="main__board">
          <div className="main__board_inner">
            <div className="main__board__header">
              <div className="main__board__left">
                <div className="main__board__name">Сентябрь</div>
              </div>
              <div className="main__board__right">
                <DrawDates />
              </div>
            </div>

            <div className="main__board__body">
              <DrawActionData />
            </div>
          </div>
        </div>
      </div>

      {/*<Input theme="green" defaultValue="000000" />*/}
      {/*<Input defaultValue="Добавить категорию" Icon={SearchIcon} />*/}
      {/*<Input theme="dark" defaultValue="00.00.0000 - 00.00.0000" Icon={CalendarIcon} />*/}

      {/*<Input defaultValue="Добавить категорию" />*/}

      {/*<Select value="Выберите тип скидки" />*/}
      {/*<Select theme="dark" value="Выберите тип скидки" />*/}
      {/*<Select theme="green" value="Выберите тип скидки" />*/}
      {/*<Select value="Полуфабрикаты" label="Категория товаров" />*/}

      {/*<Drawer />*/}
    </div>
  );
};
