import { createRef, forwardRef, useEffect, useState } from "react";
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

export const Item = ({
  index,
  name,
  status,
  promos,
  promosData,
  setPromosData,
  changePromoStatus,
}) => {
  const inputRef = createRef();
  const [nameType, setNameType] = useState("text");

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [nameType]);

  const nameClasses = `discount-board__body-item-left-name ${
    !status ? "discount-board__body-item-left-name_disabled" : ""
  }`;

  const changeNameTypeHandler = () => {
    const value = nameType === "text" ? "input" : "text";
    setNameType(value);
  };

  const changePromoStatusDate = (promoId, promoListId, status) => {
    const newPromosData = [...promosData];

    newPromosData[promoId].promos[promoListId].status = status;

    setPromosData(newPromosData);
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

  const RefInput = forwardRef((props, ref) => (
    <Input
      forwardedRef={ref}
      autoSize
      className={!status ? "discount-text-gray" : "discount-text-dark"}
      defaultValue={name}
      onBlur={changeNameTypeHandler}
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

        {nameType === "text" ? (
          <>
            <div className={nameClasses}>{name}</div>

            <div className="discount-board__body-item-left-icon">
              <InlineSVG
                element="div"
                style={{ display: "flex" }}
                src={EditPencil}
                onClick={changeNameTypeHandler}
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
        <DrawPromos promoId={index} promoStatus={status} promos={promos} />
      </div>
    </div>
  );
};
