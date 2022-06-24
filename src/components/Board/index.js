import { useState } from "react";
import "./index.scss";

// Mocks
import mocks from "../../__mocks__";
import { Item } from "./Item";

export const Board = () => {
  const [promosData, setPromosData] = useState(mocks.promos);

  const DrawDates = () =>
    mocks.dates.map(({ date, weekday }, index) => (
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

  const DrawActionData = () =>
    promosData.map(({ name, status, promos }, index) => (
      <Item
        index={index}
        key={index}
        name={name}
        status={status}
        promos={promos}
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
            <DrawDates />
          </div>
        </div>

        <div className="discount-board__body">
          <DrawActionData />
        </div>
      </div>
    </section>
  );
};
