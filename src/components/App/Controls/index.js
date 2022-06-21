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
  // Toggles
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Date
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Controls
  const [type, setType] = useState(mocks.Modal.discountTypes[0]);
  const [category, setCategory] = useState(mocks.Modal.categories[0]);
  const [discount, setDiscount] = useState(mocks.Modal.discountPercents[0]);
  const [statusFilter, setStatusFilter] = useState(mocks.Modal.statusFilter);

  // Classes
  const activeClasses = `discount-active ${
    isSearchVisible ? "discount-active_hide" : ""
  }`;

  const addClasses = `discount-add ${
    isSearchVisible ? "discount-add_hide" : ""
  }`;

  const filtersClasses = `discount-filters ${
    isSearchVisible ? "discount-filters_hide" : ""
  }`;

  const searchBtnClasses = `discount-search-btn ${
    isSearchVisible ? "discount-search-btn_lg" : ""
  }`;

  const searchInputClasses = `discount-search__input ${
    isSearchVisible ? "discount-search__input_show" : ""
  }`;

  const searchBtnCloseClasses = `discount-search__close-button ${
    isSearchVisible ? "discount-search__close-button_show" : ""
  }`;

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      forwardedRef={ref}
      className="discount-font-weight-medium discount-text-dark"
      label="Период"
      defaultValue={value || mocks.Modal.period}
      onClick={onClick}
    />
  ));

  return (
    <aside className="discount-controls">
      <div className="discount-controls-inner">
        <div className={addClasses}>
          <Button
            theme="light-green"
            value="Добавить скидку"
            LeftIcon={PlusBox}
            onClick={() => toggleModal(true)}
          />
        </div>

        <div className={activeClasses}>
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

        <div className={filtersClasses}>
          <div className="discount-filters__type">
            <Select
              value={type}
              className="discount-font-weight-medium"
              label="Тип скидки"
              variants={mocks.Modal.discountTypes}
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
              variants={mocks.Modal.discountPercents}
              onChange={(value) => {
                setDiscount(value);
              }}
            />
          </div>

          <div className="discount-filters__period">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={setDateRange}
              dateFormat="d.MM.y"
              customInput={<CustomDateInput />}
            />
          </div>

          <div className="discount-filters__category">
            <Select
              value={category}
              className="discount-font-weight-medium"
              label="Категория товаров"
              variants={mocks.Modal.categories}
              onChange={(value) => {
                setCategory(value);
              }}
            />
          </div>
        </div>

        <div className={searchBtnClasses}>
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

              <div className={searchInputClasses}>
                <Input />
              </div>

              <div
                className={searchBtnCloseClasses}
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
