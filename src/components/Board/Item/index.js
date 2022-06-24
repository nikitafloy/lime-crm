import { useRef, forwardRef, useEffect, useState } from "react";
import "./index.scss";

// Components
import { Button, Input } from "../../";

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

export const Item = ({ index, data, promos, setPromos, changePromoStatus }) => {
  const { name, status } = data;

  const inputRef = useRef();

  const [type, setType] = useState("text");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);

  const changeType = () => {
    setType(type === "text" ? "input" : "text");
  };

  const onItemPromoButtonClickHandler = (promoId, itemPromoId) => {
    const promoStatus = promos[promoId].status;
    if (!promoStatus) return;

    const itemPromo = promos[promoId].promos[itemPromoId];
    const itemPromoStatus = itemPromo.status;

    changeItemPromoStatus(itemPromo, itemPromoStatus);
  };

  const changeItemPromoStatus = (itemPromo, currentItemStatus) => {
    if (currentItemStatus && currentItemStatus !== "active") return;

    const newPromosData = [...promos];

    const currentItemStatusIsActive = currentItemStatus === "active";
    const newItemStatus = currentItemStatusIsActive ? null : "active";

    itemPromo.status = newItemStatus;

    setPromos(newPromosData);
  };

  const getItemPromoButtonTheme = (status, date) => {
    const weekday = new Date(date).getDay();
    if (status) {
      if (status === "active") {
        return "black";
      }
      return "green";
    }

    if (weekday === 4 || weekday === 5) {
      return "lighter-green";
    }
    return "gray";
  };

  const DrawPromos = ({ promoId, promoStatus }) =>
    promos[promoId].promos.map(
      ({ status: itemPromoStatus, date }, itemPromoId) => (
        <Button
          key={itemPromoId}
          type={!promoStatus && "disabled"}
          theme={getItemPromoButtonTheme(itemPromoStatus, date)}
          LeftIcon={
            itemPromoStatus &&
            (itemPromoStatus === "active" ? CheckIcon : DotIcon)
          }
          value={!itemPromoStatus && "н"}
          onClick={() => onItemPromoButtonClickHandler(promoId, itemPromoId)}
        />
      )
    );

  const RefInput = forwardRef((props, ref) => (
    <Input
      forwardedRef={ref}
      autoSize
      className={!status ? "discount-text-gray" : "discount-text-dark"}
      defaultValue={name}
      onBlur={changeType}
    />
  ));

  return (
    <div key={index} className="discount-board__body-item">
      <div className="discount-board__body-item-left">
        <div className="discount-board__body-item-left-icon">
          <Button
            theme={status ? "green" : "gray"}
            LeftIcon={status ? PlayIcon : PauseIcon}
            onClick={() => changePromoStatus(index)}
          />
        </div>

        {type === "text" ? (
          <>
            <div
              className={`discount-board__body-item-left-name ${
                !status ? "discount-board__body-item-left-name_disabled" : ""
              }`}
            >
              {name}
            </div>

            <div className="discount-board__body-item-left-icon">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={EditPencil}
                onClick={changeType}
              />
            </div>
          </>
        ) : (
          <div className="discount-board__body-item-left-name-input">
            <RefInput ref={inputRef} />
          </div>
        )}
      </div>

      <div className="discount-board__body-item-right">
        <DrawPromos promoId={index} promoStatus={status} />
      </div>
    </div>
  );
};
