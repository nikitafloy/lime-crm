import { forwardRef, useState } from "react";
import "./App.css";

import { Button, Drawer, Input, Select } from "./components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SearchIcon from "./assets/icons/search.svg";
import CalendarIcon from "./assets/icons/calendar.svg";
import TargetPoint from "./assets/icons/target_point.svg";
import PlayIcon from "./assets/icons/play.svg";
import PauseIcon from "./assets/icons/pause.svg";
import EditPencil from "./assets/icons/edit_pencil.svg";
import PlusIcon from "./assets/icons/plus.svg";
import CheckIcon from "./assets/icons/check.svg";
import PlusBox from "./assets/icons/plus_box.svg";
import DotIcon from "./assets/icons/dot.svg";
import UserIcon from "./assets/icons/user.svg";
import BellIcon from "./assets/icons/bell.svg";

import mocks from "./__mocks__";

export const App = () => {
  const [type, setType] = useState(mocks.Drawer.discountTypes[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [category, setCategory] = useState(mocks.Drawer.categories[0]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([mocks.Drawer.product]);
  const [discount, setDiscount] = useState(mocks.Drawer.discountPercents[0]);

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      ref={ref}
      className="text-dark"
      defaultValue={value || mocks.Drawer.period}
      Icon={CalendarIcon}
      onClick={onClick}
    />
  ));

  const DrawDates = () =>
    mocks.dates.map(({ date, weekday }, index) => (
      <div key={index} className="main__board__header__dates">
        <div className="main__board__header__dates__date">{date}</div>
        <div className="main__board__header__dates__weekday">{weekday}</div>
      </div>
    ));

  const DrawPromos = ({ promos }) =>
    promos.map(({ status }, index) => {
      if (status) {
        return (
          <Button
            key={index}
            theme={status === "active" ? "black" : "green"}
            leftIcon={status === "active" ? CheckIcon : DotIcon}
          />
        );
      }

      return <Button key={index} theme={"gray"} value="н" />;
    });

  const DrawActionData = () =>
    mocks.promos.map(({ name, status, promos }, index) => (
      <div key={index} className="main__board__body__item">
        <div className="main__board__body__left">
          <div className="main__board__icon">
            {status ? (
              <Button theme="green" leftIcon={PlayIcon} />
            ) : (
              <Button theme="gray" leftIcon={PauseIcon} />
            )}
          </div>
          <div className="main__board__name">{name}</div>
          <div className="main__board__icon">
            <img src={EditPencil} alt="Edit Pencil" />
          </div>
        </div>
        <div className="main__board__body__right">
          <DrawPromos promos={promos} />
        </div>
      </div>
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
            <Button
              type="lg"
              className="font-weight-bold"
              leftIcon={UserIcon}
              value="Владимировна И.А."
              secondText="Администратор"
            />

            <div className="main__header__notification">
              <Button type="lg" leftIcon={BellIcon} />
              <div className="main__notification">3</div>
            </div>
          </div>
        </div>

        <div className="main__controls">
          <div className="main__controls__add">
            <Button
              theme="light-green"
              value="Добавить скидку"
              leftIcon={PlusBox}
            />
          </div>

          <div className="main__controls__active">
            <Button
              className="btn-md font-weight-bold"
              value="Активные"
              type="outlined"
            />
            <Button
              theme="light-gray"
              className="btn-md font-weight-bold"
              value="Неактивные"
            />
          </div>

          <div className="main__controls__filters">
            <div className="main__controls__filters__type">
              <Select
                value={type}
                label="Тип скидки"
                variants={mocks.Drawer.discountTypes}
                onChange={(value) => {
                  setType(value);
                }}
              />
            </div>
            <div className="main__controls__filters__discount">
              <Select
                value={discount}
                label="% скидки"
                variants={mocks.Drawer.discountPercents}
                onChange={(value) => {
                  setDiscount(value);
                }}
              />
            </div>
            <div className="main__controls__filters__period">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={setDateRange}
                isClearable={true}
                customInput={<CustomDateInput />}
              />
            </div>
            <div className="main__controls__filters__category">
              <Select
                value={category}
                label="Категория товаров"
                variants={mocks.Drawer.categories}
                onChange={(value) => {
                  setCategory(value);
                }}
              />
            </div>
          </div>

          <div className="main__controls__search">
            <Button leftIcon={SearchIcon} />
          </div>
        </div>

        <div className="main__board">
          <div className="main__board_inner">
            <div className="main__board__header">
              <div className="main__board__header__left">
                <div className="main__board__name">Сентябрь</div>
              </div>
              <div className="main__board__header__right">
                <DrawDates />
              </div>
            </div>

            <div className="main__board__body">
              <DrawActionData />
            </div>

            <div className="main__board__header">
              <div className="main__board__header__left">
                <div className="main__board__name">Сентябрь</div>
              </div>
              <div className="main__board__header__right">
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
