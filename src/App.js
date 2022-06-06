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

  const [products] = useState(19783);
  const [discounts] = useState(19783);

  const [address] = useState("г. Минск ул Беломорская дом 7");

  const [statusFilter, setStatusFilter] = useState("Активные");

  const [user] = useState({
    name: "Владимировна И.А.",
    position: "Администратор",
  });

  const [notifications] = useState(3);

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  const CustomDateSelect = forwardRef(({ value, onClick }, ref) => (
    <Select
      ref={ref}
      className="font-weight-medium"
      label="Период"
      value={value || mocks.Modal.period}
      onClick={onClick}
    />
  ));

  const DrawSearch = () => (
    <div className="search">
      <Button LeftIcon={SearchIcon} onClick={() => console.log("search...")} />
      <Input />
      <Button LeftIcon={CrossIcon} onClick={toggleSearchVisible} />
    </div>
  );

  return (
    <main className="main">
      <header className="header">
        <div className="left">
          <div className="top">
            <div className="stats stats_disabled">
              <div className="stats__name">Товары</div>
              <div className="stats__count">{products}</div>
            </div>

            <div className="stats">
              <div className="stats__name">Скидки</div>
              <div className="stats__count">{discounts}</div>
            </div>
          </div>

          <div className="bottom">
            <div className="bottom__icon">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={TargetPoint}
              />
            </div>

            <div className="bottom__address">{address}</div>
          </div>
        </div>

        <div className="right">
          <div className="user">
            <Button
              type="lg"
              className="font-weight-bold"
              LeftIcon={UserIcon}
              value={user.name}
              secondText={user.position}
            />
          </div>

          <div className="notification">
            <Button type="lg" LeftIcon={BellIcon} />
            <div className="notification__icon">{notifications}</div>
          </div>
        </div>
      </header>

      <aside className="controls">
        {!isSearchVisible ? (
          <>
            <div className="add">
              <Button
                theme="light-green"
                value="Добавить скидку"
                LeftIcon={PlusBox}
                onClick={() => toggleModal(true)}
              />
            </div>
            <div className="active">
              {constants.activeButtonsName.map((name, index) => {
                const isActiveButton = statusFilter === name;
                return (
                  <Button
                    key={index}
                    style={
                      isActiveButton ? { border: "2px solid #a1d214" } : {}
                    }
                    type={isActiveButton && "outlined"}
                    className="btn_md font-weight-bold"
                    theme={!isActiveButton && "light-gray"}
                    value={name}
                    onClick={() => {
                      setStatusFilter(name);
                    }}
                  />
                );
              })}
            </div>
            <div className="filters">
              <div className="filters__type">
                <Select
                  value={type}
                  className="font-weight-medium"
                  label="Тип скидки"
                  variants={mocks.Modal.discountTypes}
                  onChange={(value) => {
                    setType(value);
                  }}
                />
              </div>

              <div className="filters__discount">
                <Select
                  value={discount}
                  className="font-weight-medium"
                  label="% скидки"
                  variants={mocks.Modal.discountPercents}
                  onChange={(value) => {
                    setDiscount(value);
                  }}
                />
              </div>

              <div className="filters__period">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={setDateRange}
                  dateFormat="d.MM.y"
                  customInput={<CustomDateSelect />}
                />
              </div>

              <div className="filters__category">
                <Select
                  value={category}
                  className="font-weight-medium"
                  label="Категория товаров"
                  variants={mocks.Modal.categories}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                />
              </div>
            </div>
            <div className="search-btn">
              <Button LeftIcon={SearchIcon} onClick={toggleSearchVisible} />
            </div>
          </>
        ) : (
          <DrawSearch />
        )}
      </aside>

      <Board />

      {showModal && <Modal toggleModal={toggleModal} />}
    </main>
  );
};
