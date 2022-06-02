import { forwardRef, useState } from "react";
import "./App.scss";

// Components
import { Button, Input, Modal, Select } from "./components";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Inline SVG
import InlineSVG from "svg-inline-react";

// Icons
import {
  SearchIcon,
  TargetPoint,
  PlayIcon,
  PauseIcon,
  EditPencil,
  CheckIcon,
  PlusBox,
  DotIcon,
  UserIcon,
  BellIcon,
  CrossIcon,
} from "./assets/icons";

// Mocks
import mocks from "./__mocks__";

export const App = () => {
  // Date
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [showModal, toggleModal] = useState(false);

  const [type, setType] = useState(mocks.Modal.discountTypes[0]);
  const [category, setCategory] = useState(mocks.Modal.categories[0]);
  const [discount, setDiscount] = useState(mocks.Modal.discountPercents[0]);

  const [products, setProducts] = useState(19783);
  const [discounts, setDiscounts] = useState(19783);

  const [address, setAddress] = useState("г. Минск ул Беломорская дом 7");

  const [user, setUser] = useState({
    name: "Владимировна И.А.",
    position: "Администратор",
  });

  const [notifications, setNotifications] = useState(3);

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  const CustomDateSelect = forwardRef(({ value, onClick }, ref) => (
    <Select
      ref={ref}
      label="Период"
      value={value || mocks.Modal.period}
      onClick={onClick}
    />
  ));

  const DrawDates = () =>
    mocks.dates.map(({ date, weekday }, index) => (
      <div key={index} className="main__board-header-dates">
        <div className="main__board-header-dates-date">{date}</div>
        <div className="main__board-header-dates-weekday">{weekday}</div>
      </div>
    ));

  const DrawPromos = ({ promos, promoStatus }) =>
    promos.map(({ status, date }, index) => {
      const weekday = new Date(date).getDay();
      const buttonTheme =
        weekday === 5 || weekday === 6 ? "lighter-green" : "gray";

      if (!promoStatus) {
        return (
          <Button key={index} type="disabled" theme={buttonTheme} value="н" />
        );
      }

      if (status) {
        return (
          <Button
            key={index}
            theme={status === "active" ? "black" : "green"}
            LeftIcon={status === "active" ? CheckIcon : DotIcon}
          />
        );
      }

      return <Button key={index} theme={buttonTheme} value="н" />;
    });

  const DrawActionData = () =>
    mocks.promos.map(({ name, status, promos }, index) => {
      const nameClasses = `main__board-body-item-name ${
        !status ? "main__board-body-item-name_disabled" : ""
      }`;

      return (
        <div key={index} className="main__board-body-item">
          <div className="main__board-body-item-left">
            <div className="main__board-body-item-icon">
              {status ? (
                <Button theme="green" LeftIcon={PlayIcon} />
              ) : (
                <Button theme="gray" LeftIcon={PauseIcon} />
              )}
            </div>
            <div className={nameClasses}>{name}</div>
            <div className="main__board-body-item-icon">
              <InlineSVG src={EditPencil} />
            </div>
          </div>
          <div className="main__board-body-item-right">
            <DrawPromos promoStatus={status} promos={promos} />
          </div>
        </div>
      );
    });

  const DrawControls = () => (
    <div className="main__controls">
      <div className="main__controls-add">
        <Button
          theme="light-green"
          value="Добавить скидку"
          LeftIcon={PlusBox}
          onClick={() => toggleModal(true)}
        />
      </div>

      <div className="main__controls-active">
        <Button
          className="btn_md font-weight-bold"
          value="Активные"
          type="outlined"
        />
        <Button
          theme="light-gray"
          className="btn_md font-weight-bold"
          value="Неактивные"
        />
      </div>

      <div className="main__controls-filters">
        <div className="main__controls-filters-type">
          <Select
            value={type}
            label="Тип скидки"
            variants={mocks.Modal.discountTypes}
            onChange={(value) => {
              setType(value);
            }}
          />
        </div>
        <div className="main__controls-filters-discount">
          <Select
            value={discount}
            label="% скидки"
            variants={mocks.Modal.discountPercents}
            onChange={(value) => {
              setDiscount(value);
            }}
          />
        </div>
        <div className="main__controls-filters-period">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={setDateRange}
            isClearable={true}
            customInput={<CustomDateSelect />}
          />
        </div>
        <div className="main__controls-filters-category">
          <Select
            value={category}
            label="Категория товаров"
            variants={mocks.Modal.categories}
            onChange={(value) => {
              setCategory(value);
            }}
          />
        </div>
      </div>

      <div className="main__controls-search">
        <Button LeftIcon={SearchIcon} onClick={toggleSearchVisible} />
      </div>
    </div>
  );

  const DrawSearch = () => (
    <div className="main__controls">
      <div className="main__search">
        <Button
          LeftIcon={SearchIcon}
          onClick={() => console.log("search...")}
        />
        <Input />
        <Button LeftIcon={CrossIcon} onClick={toggleSearchVisible} />
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="main">
        <div className="main__header">
          <div className="main__header-left">
            <div className="main__header-left-top">
              <div className="main__header-left-stats main__header-left-stats_disabled">
                <div className="main__header-left-stats-name">Товары</div>
                <div className="main__header-left-stats-count">{products}</div>
              </div>

              <div className="main__header-left-stats">
                <div className="main__header-left-stats-name">Скидки</div>
                <div className="main__header-left_stats-count">{discounts}</div>
              </div>
            </div>

            <div className="main__header-left-bottom">
              <div className="main__header-left-bottom-icon">
                <InlineSVG src={TargetPoint} />
              </div>
              <div className="main__header-left-bottom-address">{address}</div>
            </div>
          </div>

          <div className="main__header-right">
            <Button
              type="lg"
              className="font-weight-bold"
              LeftIcon={UserIcon}
              value={user.name}
              secondText={user.position}
            />

            <div className="main__header-notification">
              <Button type="lg" LeftIcon={BellIcon} />
              <div className="main__notification">{notifications}</div>
            </div>
          </div>
        </div>

        {!isSearchVisible ? <DrawControls /> : <DrawSearch />}

        <div className="main__board">
          <div className="main__board-inner">
            <div className="main__board-header">
              <div className="main__board-header-left">
                <div className="main__board-name">Сентябрь</div>
              </div>
              <div className="main__board-header-right">
                <DrawDates />
              </div>
            </div>

            <div className="main__board-body">
              <DrawActionData />
            </div>

            <div className="main__board-header">
              <div className="main__board-header-left">
                <div className="main__board-name">Сентябрь</div>
              </div>
              <div className="main__board-header-right">
                <DrawDates />
              </div>
            </div>

            <div className="main__board-body">
              <DrawActionData />
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal toggleModal={toggleModal} />}
    </div>
  );
};
