import { forwardRef, useState } from "react";
import "./index.scss";

// Components
import { Button, Input, Select, Textarea } from "../";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Immutable JS

// Inline SVG
import InlineSVG from "svg-inline-react";

// Icons
import {
  ArrayIcon,
  CalendarIcon,
  CrossIcon,
  PlusBox,
  SearchIcon,
} from "../../assets/icons";

// Mocks
import mocks from "../../__mocks__";

let lastUsedFilter = null;

export const Modal = ({ toggleModal }) => {
  // Date
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [type, setType] = useState(null);
  const [showDesc, toggleDesc] = useState(false);
  const [weekdays, setWeekdays] = useState(mocks.Modal.weekdays);

  const _setWeekdays = (type, condition) => {
    if (lastUsedFilter && lastUsedFilter === type) {
      setLastUsedFilter(type);

      return mocks.Modal.weekdays;
    }

    const weekdaysArray = condition();

    setLastUsedFilter(type);

    return weekdaysArray;
  };

  const setLastUsedFilter = (filterName) => {
    if (lastUsedFilter && lastUsedFilter === filterName) {
      lastUsedFilter = null;
      return;
    }

    lastUsedFilter = filterName;
  };

  const daysFilters = [
    {
      label: "Все",
      type: "all",
      condition: () =>
        weekdays.map((item) => {
          return { ...item, selected: true };
        }),
    },
    {
      label: "Чет.",
      type: "even",
      condition: () =>
        weekdays.map((item, index) => {
          return { ...item, selected: index % 2 !== 0 };
        }),
    },
    {
      label: "Нечет.",
      type: "odd",
      condition: () =>
        weekdays.map((item, index) => {
          return { ...item, selected: index % 2 === 0 };
        }),
    },
  ];

  const DrawDaysFilters = () => (
    <div className="modal__promotion-weekday-filters">
      {daysFilters.map(({ label, type, condition }, index) => (
        <Button
          key={index}
          className="text-light-gray"
          theme="gray"
          value={label}
          onClick={() => setWeekdays(_setWeekdays(type, condition))}
        />
      ))}
    </div>
  );

  const descriptionSwitchClasses = `description__toggle ${
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
    <div className="modal__products-button">
      <Button
        className="text-white"
        theme="light-green"
        value="Добавить"
        LeftIcon={PlusBox}
      />

      <div className="modal__products-button-dropdown">
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
        <div className="modal__title font-weight-bold">Добавление скидки</div>

        <div className="modal__promotion">
          <div className="modal__promotion-left">
            <div className="modal__promotion-discount">
              <Select
                type="outlined"
                value={type || "Выберите тип скидки"}
                variants={mocks.Modal.discountTypes}
                onChange={setType}
              />
            </div>

            <div className="modal__promotion-period">
              <div className="modal__promotion-period-text">Период акции</div>

              <div className="modal__promotion-period-select">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={setDateRange}
                  dateFormat="d.MM.y"
                  customInput={<CustomDateSelect />}
                />
              </div>
            </div>

            <div className="modal__promotion-weekday">
              <DrawDaysFilters />

              <div className="modal__promotion-weekday-days">
                {weekdays.map(({ weekday, selected }, index) => {
                  const buttonClasses = `font-weight-bold ${
                    selected ? "text-white" : "text-light-gray"
                  }`;

                  return (
                    <Button
                      key={index}
                      className={buttonClasses}
                      theme={selected ? "light-green" : "gray"}
                      value={weekday}
                      onClick={() =>
                        setWeekdays(
                          weekdays.map((item, _index) => {
                            return {
                              ...item,
                              selected:
                                _index === index
                                  ? !item.selected
                                  : item.selected,
                            };
                          })
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal__promotion-right">
            <div className="modal__promotion-promos">
              <div className="modal__promotion-promos-text">
                Использовать текущие акции
              </div>

              <div className="modal__promotion-promos-buttons">
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
        </div>

        <div className="description">
          <div
            className={descriptionSwitchClasses}
            onClick={() => toggleDesc(!showDesc)}
          >
            <div className="description__toggle-label">
              {showDesc ? "Скрыть" : "Добавить описание"}
            </div>

            <div className="description__toggle-array">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={ArrayIcon}
              />
            </div>
          </div>

          {showDesc && (
            <div className="description__textarea">
              <Textarea />
            </div>
          )}
        </div>

        <div className="modal__products">
          <DrawProductsButton />

          <div className="modal__products-list">
            <div className="modal__products-list-header">
              <div className="modal__products-list-header-article">
                <div className="modal__products-list-header-text">Артикул</div>

                <div className="modal__products-list-header-array">
                  <InlineSVG
                    element="div"
                    style={{ display: "flex" }}
                    src={ArrayIcon}
                  />
                </div>
              </div>

              <div className="modal__products-list-header-article">
                <div className="modal__products-list-header-text">
                  Фикс. прайс
                </div>

                <div className="modal__products-list-header-array">
                  <InlineSVG
                    element="div"
                    style={{ display: "flex" }}
                    src={ArrayIcon}
                  />
                </div>
              </div>
            </div>

            <div className="modal__products-list-item">
              <div className="modal__products-list-action-button">
                <Button LeftIcon={CrossIcon} />
              </div>

              <div className="modal__products-list-article">
                <Input
                  className="font-weight-bold text-dark"
                  type="outlined"
                  defaultValue="0000000000000"
                />
              </div>

              <div className="modal__products-list-search">
                <Select
                  type="outlined"
                  value="Поиск по наименованию"
                  LeftIcon={SearchIcon}
                />
              </div>

              <div className="modal__products-list-values">
                <Input type="outlined" defaultValue="0" />
                <Input type="outlined" defaultValue="0" />
              </div>
            </div>
          </div>

          <DrawProductsButton />
        </div>

        <hr />

        <div className="modal__action-buttons">
          <Button
            className="text-white font-weight-bold"
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
