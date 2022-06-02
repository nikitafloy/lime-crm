import { forwardRef, useState } from "react";
import "./index.css";

import { Button, Input, Select, Textarea } from "../";

import {
  CrossIcon,
  CalendarIcon,
  ArrayIcon,
  PlusBox,
  SearchIcon,
} from "../../assets/icons";

import mocks from "../../__mocks__";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InlineSVG from "svg-inline-react";

export const Modal = ({ toggleModal }) => {
  const [type, setType] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [weekdays, setWeekdays] = useState([1]);
  const [showDesc, toggleDesc] = useState(false);

  const descriptionSwitchingClasses = [
    "modal__current__description__switching",
  ];

  if (showDesc) {
    descriptionSwitchingClasses.push("open");
  }

  const CustomDateSelect = forwardRef(({ value, onClick }, ref) => (
    <Select
      type="outlined"
      ref={ref}
      LeftIcon={CalendarIcon}
      value={value || mocks.Modal.period}
      onClick={onClick}
    />
  ));

  const onDropDownClickHandler = (event) => {
    const variant = event.target.innerText;

    console.log(variant);
  };

  const DrawProductsButton = () => (
    <div className="modal__current__products__button">
      <Button
        className="text-white"
        theme="light-green"
        value="Добавить"
        LeftIcon={PlusBox}
      />

      <div className="modal__current__products__button__dropdown">
        <ul className="font-weight-bold">
          {mocks.Modal.dropdown.map((item, index) => (
            <li key={index} onClick={onDropDownClickHandler}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="modal">
      <div className="modal__current">
        <div className="modal__current__title font-weight-bold">
          Добавление скидки
        </div>

        <div className="modal__current__promotion">
          <div className="modal__current__promotion__left">
            <div className="modal__current__promotion__discount">
              <Select
                type="outlined"
                value={type || "Выберите тип скидки"}
                variants={mocks.Modal.discountTypes}
                onChange={setType}
              />
            </div>

            <div className="modal__current__promotion__period">
              <div className="modal__current__promotion__period__text">
                Период акции
              </div>

              <div className="modal__current__promotion__period__select">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={setDateRange}
                  isClearable={true}
                  customInput={<CustomDateSelect />}
                />
              </div>
            </div>

            <div className="modal__current__promotion__weekday">
              <div className="modal__current__promotion__weekday__filters">
                <Button className="text-light-gray" theme="gray" value="Все" />
                <Button className="text-light-gray" theme="gray" value="Чет." />
                <Button
                  className="text-light-gray"
                  theme="gray"
                  value="Нечет."
                />
              </div>

              <div className="modal__current__promotion__weekday__days">
                {mocks.Modal.weekdays.map((weekday, index) => {
                  const candidate = weekdays.findIndex(
                    (_weekday) => index === _weekday
                  );

                  const isCandidate = candidate !== -1;
                  const buttonClasses = ["font-weight-bold"];

                  buttonClasses.push(
                    isCandidate ? "text-white" : "text-light-gray"
                  );

                  return (
                    <Button
                      key={index}
                      className={buttonClasses.join(" ")}
                      theme={isCandidate ? "light-green" : "gray"}
                      value={weekday}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal__current__promotion__right">
            <div className="modal__current__promotion__promos__text">
              Использовать текущие акции
            </div>

            <div className="modal__current__promotion__promos">
              {mocks.Modal.discountTypes.map((discount, index) => (
                <Button
                  key={index}
                  className="text-light-gray"
                  theme="gray"
                  value={discount}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="modal__current_description">
          <div
            className={descriptionSwitchingClasses.join(" ")}
            onClick={() => toggleDesc(!showDesc)}
          >
            <div className="modal__current__description__switching__label">
              {showDesc ? "Скрыть" : "Добавить описание"}
            </div>

            <div className="modal__current_description__switching__array">
              <InlineSVG src={ArrayIcon} />
            </div>
          </div>

          {showDesc && (
            <div className="modal__current__description__textarea">
              <Textarea />
            </div>
          )}
        </div>

        <div className="modal__current__products">
          <DrawProductsButton />

          <div className="modal__current__products__list">
            <div className="modal__current__products__list__header">
              <div className="modal__current__products__list__header__article">
                <div className="modal__current__products__list__header__text">
                  Артикул
                </div>

                <div className="modal__current__products__list__header__array">
                  <InlineSVG src={ArrayIcon} />
                </div>
              </div>

              <div className="modal__current__products__list__header__article">
                <div className="modal__current__products__list__header__text">
                  Фикс. прайс
                </div>

                <div className="modal__current__products__list__header__array">
                  <InlineSVG src={ArrayIcon} />
                </div>
              </div>
            </div>

            <div className="modal__current__products__list__item">
              <div className="modal__current__products__list__action-button">
                <Button LeftIcon={CrossIcon} />
              </div>

              <div className="modal__current__products__list__article">
                <Input
                  className="font-weight-bold text-dark"
                  type="outlined"
                  defaultValue="0000000000000"
                />
              </div>

              <div className="modal__current__products__list__search">
                <Select
                  type="outlined"
                  value="Поиск по наименованию"
                  LeftIcon={SearchIcon}
                />
              </div>

              <div className="modal__current__products__list__values">
                <Input type="outlined" defaultValue="0" />
                <Input type="outlined" defaultValue="0" />
              </div>
            </div>
          </div>

          <DrawProductsButton />
        </div>

        <hr />

        <div className="modal__current__action-buttons">
          <Button
            className="text-white font-weight-bold"
            type="lg"
            theme="light-green"
            value="Сохранить"
          />
          <Button
            className="font-weight-bold"
            type="outlined"
            value="Остановить"
          />
          <Button
            className="font-weight-bold"
            type="lg"
            theme="gray"
            value="Удалить"
          />
        </div>
      </div>

      <div className="modal__close-button" onClick={() => toggleModal()}>
        <Button LeftIcon={CrossIcon} />
      </div>
    </div>
  );
};
