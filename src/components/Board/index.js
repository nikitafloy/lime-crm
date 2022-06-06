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

export const Board = () => {
  const [promosData, setPromosData] = useState(List(mocks.promos));

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
            {/*<Input className="text-dark" />*/}
            <div className="board__body-item-left-icon">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={EditPencil}
              />
            </div>
          </div>
          <div className="board__body-item-right">
            <DrawPromos promoId={index} promoStatus={status} promos={promos} />
          </div>
        </div>
      );
    });

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
