import { forwardRef, useState } from "react";
import "./index.scss";

// Components
import { Button, Input, Select } from "../../";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Icons
import { SearchIcon, PlusBox, CrossIcon } from "../../../assets/icons";

// Constants
import constants from "../../../const";

// Mocks
import mocks from "../../../__mocks__";

export const Controls = ({ toggleModal }) => {
  // Mocks
  const { discountTypes, categories, discountPercents } = mocks.Modal;

  // Toggles
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Controls
  const [type, setType] = useState(discountTypes[0]);
  const [category, setCategory] = useState(categories[0]);
  const [discount, setDiscount] = useState(discountPercents[0]);
  const [statusFilter, setStatusFilter] = useState(mocks.Modal.statusFilter);

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  return (
    <aside className="discount-controls">
      <div className="discount-controls-inner">
        <div
          className={`discount-add ${
            isSearchVisible ? "discount-add_hide" : ""
          }`}
        >
          <Button
            theme="light-green"
            value="Добавить скидку"
            LeftIcon={PlusBox}
            onClick={() => toggleModal(true)}
          />
        </div>

        <div
          className={`discount-active ${
            isSearchVisible ? "discount-active_hide" : ""
          }`}
        >
          {constants.activeButtonsName.map((name, index) => {
            const isActiveButton = statusFilter === name;
            return (
              <Button
                key={index}
                style={isActiveButton ? { border: "2px solid #a1d214" } : {}}
                type={isActiveButton && "outlined"}
                className="discount-btn_md discount-font-weight-bold"
                theme={!isActiveButton && "light-gray"}
                value={name}
                onClick={() => {
                  setStatusFilter(name);
                }}
              />
            );
          })}
        </div>

        <div
          className={`discount-filters ${
            isSearchVisible ? "discount-filters_hide" : ""
          }`}
        >
          <div className="discount-filters__type">
            <Select
              value={type}
              className="discount-font-weight-medium"
              label="Тип скидки"
              variants={discountTypes}
              onChange={(value) => {
                setType(value);
              }}
            />
          </div>

          <div className="discount-filters__discount">
            <Select
              value={discount}
              className="discount-font-weight-medium"
              label="% скидки"
              variants={discountPercents}
              onChange={(value) => {
                setDiscount(value);
              }}
            />
          </div>

          <div className="discount-filters__period">
            <div className="discount-filters__period-inner discount-font-weight-medium">
              <div className="discount-filters__period-label">Период</div>
              <div className="discount-filters__period-datepicker">
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd.MM.yyyy"
                />

                <div className="discount-filters__period-divider">-</div>

                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd.MM.yyyy"
                />
              </div>
            </div>
          </div>

          <div className="discount-filters__category">
            <Select
              value={category}
              className="discount-font-weight-medium"
              label="Категория товаров"
              variants={categories}
              onChange={(value) => {
                setCategory(value);
              }}
            />
          </div>
        </div>

        <div
          className={`discount-search-btn ${
            isSearchVisible ? "discount-search-btn_lg" : ""
          }`}
        >
          <div className="discount-search-btn-inner">
            <div className="discount-search">
              <div
                className="discount-search__search-button"
                onClick={toggleSearchVisible}
              >
                <Button
                  LeftIcon={SearchIcon}
                  onClick={() => console.log("search...")}
                />
              </div>

              <div
                className={`discount-search__input ${
                  isSearchVisible ? "discount-search__input_show" : ""
                }`}
              >
                <Input />
              </div>

              <div
                className={`discount-search__close-button ${
                  isSearchVisible ? "discount-search__close-button_show" : ""
                }`}
                onClick={toggleSearchVisible}
              >
                <Button LeftIcon={CrossIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
