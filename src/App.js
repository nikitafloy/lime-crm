import { forwardRef, useState } from "react";
import "./App.scss";

// Components
import { Button, Input, Modal, Select } from "./components";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Immutable JS
import { List, Map } from "immutable";

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

  const [promosData, setPromosData] = useState(List(mocks.promos));
  const [statusFilter, setStatusFilter] = useState("Активные");

  const [user] = useState({
    name: "Владимировна И.А.",
    position: "Администратор",
  });

  const [notifications] = useState(3);

  const toggleSearchVisible = () => setSearchVisible(!isSearchVisible);

  const changePromoStatus = (promoId) => {
    setPromosData(
      promosData.set(promoId, {
        ...promosData.get(promoId),
        status: !promosData.get(promoId).status,
      })
    );
  };

  const changePromoStatusDate = (promoId, promoListId, status) => {
    const promos = promosData.get(promoId).promos;
    promos[promoListId].status = status;

    setPromosData(
      promosData.set(promoId, {
        ...promosData.get(promoId),
        promos,
      })
    );
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

  const DrawPromos = ({ promoId, promos, promoStatus }) =>
    promos.map(({ status, date }, index) => {
      const weekday = new Date(date).getDay();
      return (
        <Button
          key={index}
          type={!promoStatus && "disabled"}
          theme={
            status
              ? status === "active"
                ? "black"
                : "green"
              : weekday === 4 || weekday === 5
              ? "lighter-green"
              : "gray"
          }
          LeftIcon={status && (status === "active" ? CheckIcon : DotIcon)}
          value={!status && "н"}
          onClick={() => {
            if (!promoStatus) return;
            if (status && status !== "active") return;

            changePromoStatusDate(promoId, index, !status ? "active" : null);
          }}
        />
      );
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
              <Button
                theme={status ? "green" : "gray"}
                LeftIcon={status ? PlayIcon : PauseIcon}
                onClick={() => changePromoStatus(index)}
              />
            </div>
            <div className={nameClasses}>{name}</div>
            <div className="board__body-item-left-icon">
              <InlineSVG src={EditPencil} />
            </div>
          </div>
          <div className="board__body-item-right">
            <DrawPromos promoId={index} promoStatus={status} promos={promos} />
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
        {constants.activeButtonsName.map((name, index) => {
          const isActiveButton = statusFilter === name;
          return (
            <Button
              key={index}
              style={isActiveButton ? { border: "2px solid #a1d214" } : {}}
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
