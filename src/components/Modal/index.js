import { forwardRef, useState } from "react";
import "./index.css";

import { Button, Select } from "../";

import { CrossIcon, CalendarIcon } from "../../assets/icons";

import mocks from "../../__mocks__";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Modal = () => {
  const [type, setType] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [weekdays, setWeekdays] = useState([1]);

  const CustomDateSelect = forwardRef(({ value, onClick }, ref) => (
    <Select
      type="outlined"
      ref={ref}
      leftIcon={CalendarIcon}
      value={value || mocks.Drawer.period}
      onClick={onClick}
    />
  ));

  return (
    <div className="modal">
      <div className="modal__current">
        <div className="modal__current__title font-weight-bold">
          Добавление скидки
        </div>

        <div className="modal__current__promotion">
          <div className="modal__current__promotion__left">
            <div className="modal__current__promotion__discount">
              <Select
                type="outlined"
                value={type || "Выберите тип скидки"}
                variants={mocks.Drawer.discountTypes}
                onChange={setType}
              />
            </div>

            <div className="modal__current__promotion__period">
              <div className="modal__current__promotion__period__text">
                Период акции
              </div>

              <div className="modal__current__promotion__period__select">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={setDateRange}
                  isClearable={true}
                  customInput={<CustomDateSelect />}
                />
              </div>
            </div>

            <div className="modal__current__promotion__weekday">
              <div className="modal__current__promotion__weekday__filters">
                <Button className="text-light-gray" theme="gray" value="Все" />
                <Button className="text-light-gray" theme="gray" value="Чет." />
                <Button
                  className="text-light-gray"
                  theme="gray"
                  value="Нечет."
                />
              </div>

              <div className="modal__current__promotion__weekday__days">
                {mocks.Modal.weekdays.map((weekday, index) => {
                  const candidate = weekdays.findIndex(
                    (_weekday) => index === _weekday
                  );

                  const isCandidate = candidate !== -1;
                  const buttonClasses = ["font-weight-bold"];

                  buttonClasses.push(
                    isCandidate ? "text-white" : "text-light-gray"
                  );

                  return (
                    <Button
                      key={index}
                      className={buttonClasses.join(" ")}
                      theme={isCandidate ? "light-green" : "gray"}
                      value={weekday}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="modal__current__promotion__right">
            <div className="modal__current__promotion__promos__text">
              Использовать текущие акции
            </div>

            <div className="modal__current__promotion__promos">
              {mocks.Drawer.discountTypes.map((discount, index) => (
                <Button
                  key={index}
                  className="text-light-gray"
                  theme="gray"
                  value={discount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="modal__close-button">
        <Button leftIcon={CrossIcon} />
      </div>
    </div>
  );
};
