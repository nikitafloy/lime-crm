import { useState } from "react";
import "./index.scss";

// Components
import { Button } from "../Button";

// Icons
import {
  CheckIcon,
  DotIcon,
  EditPencil,
  PauseIcon,
  PlayIcon,
} from "../../assets/icons";

// Inline SVG
import InlineSVG from "svg-inline-react";

// Immutable JS
import { List } from "immutable";

// Mocks
import mocks from "../../__mocks__";
import { Item } from "./Item";

export const Board = () => {
  const [promosData, setPromosData] = useState(List(mocks.promos));

  const DrawDates = () =>
    mocks.dates.map(({ date, weekday }, index) => (
      <div key={index} className="board__header-dates">
        <div className="board__header-dates-date">{date}</div>
        <div className="board__header-dates-weekday">{weekday}</div>
      </div>
    ));

  const changePromoStatus = (promoId) => {
    setPromosData(
      promosData.set(promoId, {
        ...promosData.get(promoId),
        status: !promosData.get(promoId).status,
      })
    );
  };

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
  );
};
