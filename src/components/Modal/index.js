import { forwardRef, useState } from "react";
import "./index.scss";

// Components
import { Button, Input, Select, Textarea } from "../";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Inline SVG
import InlineSVG from "svg-inline-react";

// Icons
import {
  CrossIcon,
  CalendarIcon,
  ArrayIcon,
  PlusBox,
  SearchIcon,
} from "../../assets/icons";

// Mocks
import mocks from "../../__mocks__";

export const Modal = ({ toggleModal }) => {
  // Date
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [type, setType] = useState(null);
  const [weekdays, setWeekdays] = useState([1]);
  const [showDesc, toggleDesc] = useState(false);

  const descriptionSwitchClasses = `modal__current-description-switching ${
    showDesc ? "open" : ""
  }`;

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
    <div className="modal__current-products-button">
      <Button
        className="text-white"
        theme="light-green"
        value="Добавить"
        LeftIcon={PlusBox}
      />

      <div className="modal__current-products-button-dropdown">
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
        <div className="modal__current-title font-weight-bold">
          Добавление скидки
        </div>

        <div className="modal__current-promotion">
          <div className="modal__current-promotion-left">
            <div className="modal__current-promotion-discount">
              <Select
                type="outlined"
                value={type || "Выберите тип скидки"}
                variants={mocks.Modal.discountTypes}
                onChange={setType}
              />
            </div>

            <div className="modal__current-promotion-period">
              <div className="modal__current-promotion-period-text">
                Период акции
              </div>

              <div className="modal__current-promotion-period-select">
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

            <div className="modal__current-promotion-weekday">
              <div className="modal__current-promotion-weekday-filters">
                <Button className="text-light-gray" theme="gray" value="Все" />
                <Button className="text-light-gray" theme="gray" value="Чет." />
                <Button
                  className="text-light-gray"
                  theme="gray"
                  value="Нечет."
                />
              </div>

              <div className="modal__current-promotion-weekday-days">
                {mocks.Modal.weekdays.map((weekday, index) => {
                  const candidate = weekdays.findIndex(
                    (_weekday) => index === _weekday
                  );

                  const isCandidate = candidate !== -1;

                  const buttonClasses = `font-weight-bold ${
                    isCandidate ? "text-white" : "text-light-gray"
                  }`;

                  return (
                    <Button
                      key={index}
                      className={buttonClasses}
                      theme={isCandidate ? "light-green" : "gray"}
                      value={weekday}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal__current-promotion-right">
            <div className="modal__current-promotion-promos-text">
              Использовать текущие акции
            </div>

            <div className="modal__current-promotion-promos">
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

        <div className="modal__current-description">
          <div
            className={descriptionSwitchClasses}
            onClick={() => toggleDesc(!showDesc)}
          >
            <div className="modal__current-description-switching-label">
              {showDesc ? "Скрыть" : "Добавить описание"}
            </div>

            <div className="modal__current-description-switching-array">
              <InlineSVG src={ArrayIcon} />
            </div>
          </div>

          {showDesc && (
            <div className="modal__current-description-textarea">
              <Textarea />
            </div>
          )}
        </div>

        <div className="modal__current-products">
          <DrawProductsButton />

          <div className="modal__current-products-list">
            <div className="modal__current-products-list-header">
              <div className="modal__current-products-list-header-article">
                <div className="modal__current-products-list-header-text">
                  Артикул
                </div>

                <div className="modal__current-products-list-header-array">
                  <InlineSVG src={ArrayIcon} />
                </div>
              </div>

              <div className="modal__current-products-list-header-article">
                <div className="modal__current-products-list-header-text">
                  Фикс. прайс
                </div>

                <div className="modal__current-products-list-header-array">
                  <InlineSVG src={ArrayIcon} />
                </div>
              </div>
            </div>

            <div className="modal__current-products-list-item">
              <div className="modal__current-products-list-action-button">
                <Button LeftIcon={CrossIcon} />
              </div>

              <div className="modal__current-products-list-article">
                <Input
                  className="font-weight-bold text-dark"
                  type="outlined"
                  defaultValue="0000000000000"
                />
              </div>

              <div className="modal__current-products-list-search">
                <Select
                  type="outlined"
                  value="Поиск по наименованию"
                  LeftIcon={SearchIcon}
                />
              </div>

              <div className="modal__current-products-list-values">
                <Input type="outlined" defaultValue="0" />
                <Input type="outlined" defaultValue="0" />
              </div>
            </div>
          </div>

          <DrawProductsButton />
        </div>

        <hr />

        <div className="modal__current-action-buttons">
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
