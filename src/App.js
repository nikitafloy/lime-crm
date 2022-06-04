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

  const [products] = useState(19783);
  const [discounts] = useState(19783);

  const [address] = useState("г. Минск ул Беломорская дом 7");

  const [promosData, setPromosData] = useState(mocks.promos);

  const [user] = useState({
    name: "Владимировна И.А.",
    position: "Администратор",
  });

  const [notifications] = useState(3);

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  const changePromoStatus = (promoId) => {
    const newArrayPromosData = [...promosData];
    newArrayPromosData[promoId].status = !newArrayPromosData[promoId].status;
    setPromosData(newArrayPromosData);
  };

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
      <div key={index} className="board__header-dates">
        <div className="board__header-dates-date">{date}</div>
        <div className="board__header-dates-weekday">{weekday}</div>
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
    promosData.map(({ name, status, promos }, index) => {
      const nameClasses = `board__body-item-left-name ${
        !status ? "board__body-item-left-name_disabled" : ""
      }`;

      return (
        <div key={index} className="board__body-item">
          <div className="board__body-item-left">
            <div className="board__body-item-left-icon">
              {status ? (
                <Button
                  theme="green"
                  LeftIcon={PlayIcon}
                  onClick={() => changePromoStatus(index)}
                />
              ) : (
                <Button
                  theme="gray"
                  LeftIcon={PauseIcon}
                  onClick={() => changePromoStatus(index)}
                />
              )}
            </div>
            <div className={nameClasses}>{name}</div>
            <div className="board__body-item-left-icon">
              <InlineSVG src={EditPencil} />
            </div>
          </div>
          <div className="board__body-item-right">
            <DrawPromos promoStatus={status} promos={promos} />
          </div>
        </div>
      );
    });

  const DrawControls = () => (
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

      <div className="filters">
        <div className="filters__type">
          <Select
            value={type}
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
            isClearable={true}
            customInput={<CustomDateSelect />}
          />
        </div>

        <div className="filters__category">
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

      <div className="search-btn">
        <Button LeftIcon={SearchIcon} onClick={toggleSearchVisible} />
      </div>
    </>
  );

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
              <InlineSVG src={TargetPoint} />
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
        {!isSearchVisible ? <DrawControls /> : <DrawSearch />}
      </aside>

      <section className="board">
        <div className="board-inner">
          <div className="board__header">
            <div className="board__header-left">
              <div className="board__header-name">Сентябрь</div>
            </div>

            <div className="board__header-right">
              <DrawDates />
            </div>
          </div>

          <div className="board__body">
            <DrawActionData />
          </div>
        </div>
      </section>

      {showModal && <Modal toggleModal={toggleModal} />}
    </main>
  );
};
