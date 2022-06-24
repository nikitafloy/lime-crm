import { useState } from "react";
import "./index.scss";

// Components
import { Item } from "./Item";

// Mocks
import mocks from "../../__mocks__";

export const Board = () => {
  const { promos, dates } = mocks;

  const [promosData, setPromosData] = useState(promos);

  const Dates = () =>
    dates.map(({ date, weekday }, index) => (
      <div key={index} className="discount-board__header-dates">
        <div className="discount-board__header-dates-date">{date}</div>
        <div className="discount-board__header-dates-weekday">{weekday}</div>
      </div>
    ));

  const changePromoStatus = (promoId) =>
    setPromosData(
      promosData.map((item, index) => {
        if (index === promoId) {
          return { ...item, status: !item.status };
        }
        return item;
      })
    );

  const BoardBody = () =>
    promosData.map(({ name, status }, index) => (
      <Item
        index={index}
        key={index}
        name={name}
        status={status}
        promosData={promosData}
        setPromosData={setPromosData}
        changePromoStatus={changePromoStatus}
      />
    ));

  return (
    <section className="discount-board">
      <div className="discount-board-inner">
        <div className="discount-board__header">
          <div className="discount-board__header-left">
            <div className="discount-board__header-name">Сентябрь</div>
          </div>

          <div className="discount-board__header-right">
            <Dates />
          </div>
        </div>

        <div className="discount-board__body">
          <BoardBody />
        </div>
      </div>
    </section>
  );
};
