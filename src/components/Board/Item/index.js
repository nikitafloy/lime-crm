// Components
import { Button } from "../../Button";

// Icons
import {
  CheckIcon,
  DotIcon,
  EditPencil,
  PauseIcon,
  PlayIcon,
} from "../../../assets/icons";

// Inline SVG
import InlineSVG from "svg-inline-react";

export const Item = ({
  index,
  name,
  status,
  promos,
  promosData,
  setPromosData,
  changePromoStatus,
}) => {
  const nameClasses = `board__body-item-left-name ${
    !status ? "board__body-item-left-name_disabled" : ""
  }`;

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
};
