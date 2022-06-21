import { forwardRef, useState } from "react";
import "./App.scss";

// Components
import { Board, Button, Input, Modal, Select } from "./components";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Inline SVG
import InlineSVG from "svg-inline-react";

// Icons
import {
  SearchIcon,
  TargetPoint,
  PlusBox,
  UserIcon,
  BellIcon,
  CrossIcon,
} from "./assets/icons";

// Mocks
import mocks from "./__mocks__";

// Constants
import constants from "./const";

export const App = () => {
  // Date
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [showModal, toggleModal] = useState(false);

  const [type, setType] = useState(mocks.Modal.discountTypes[0]);
  const [category, setCategory] = useState(mocks.Modal.categories[0]);
  const [discount, setDiscount] = useState(mocks.Modal.discountPercents[0]);

  const [products] = useState(mocks.Modal.productsCount);
  const [discounts] = useState(mocks.Modal.discountsCount);

  const [address] = useState(mocks.Modal.address);

  const [statusFilter, setStatusFilter] = useState(mocks.Modal.statusFilter);

  const [user] = useState(mocks.Modal.user);

  const [notifications] = useState(mocks.Modal.notifications);

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
    <main className="discount-main">
      <header className="discount-header">
        <div className="discount-left">
          <div className="discount-top">
            <div className="discount-stats discount-stats_disabled">
              <div className="discount-stats__name">Товары</div>
              <div className="discount-stats__count">{products}</div>
            </div>

            <div className="discount-stats">
              <div className="discount-stats__name">Скидки</div>
              <div className="discount-stats__count">{discounts}</div>
            </div>
          </div>

          <div className="discount-bottom">
            <div className="discount-bottom__icon">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={TargetPoint}
              />
            </div>

            <div className="discount-bottom__address">{address}</div>
          </div>
        </div>

        <div className="discount-right">
          <div className="discount-user">
            <Button
              type="lg"
              className="discount-font-weight-bold"
              LeftIcon={UserIcon}
              value={user.name}
              secondText={user.position}
            />
          </div>

          <div className="discount-notification">
            <Button type="lg" LeftIcon={BellIcon} />
            <div className="discount-notification__icon">{notifications}</div>
          </div>
        </div>
      </header>

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

      <Board />

      {showModal && <Modal toggleModal={toggleModal} />}
    </main>
  );
};
