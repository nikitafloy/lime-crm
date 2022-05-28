import { useEffect, useState } from "react";
import "./index.css";

import { Input, Textarea, Select } from "..";
import CalendarIcon from "../../assets/icons/calendar.svg";
import PlusBox from "../../assets/icons/plus_box.svg";
import PlusGreenBox from "../../assets/icons/plus_box_big_green.svg";
import Se from "react-datepicker";

export const Drawer = () => {
  // const [discountState, setDiscountState] = useState({
  //   type: null,
  //   date: null,
  //   category: [],
  //   desc: "",
  // });

  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    console.log("render");
    console.log(date);
  });

  return (
    <div className="drawer-box">
      <div className="drawer-box__current">
        <div className="drawer-box__title">
          <div className="drawer-box__title__text">Добавление скидки</div>
          <div className="drawer-box__title__close">X</div>
        </div>

        <div className="drawer-box__content">
          <div className="drawer-box__form">
            <div className="drawer-box__form__label">Тип скидки</div>
            <div className="drawer-box__form__form">
              <Select
                value={type || "Выберите тип скидки"}
                variants={["1+1", "2+1", "3+1"]}
                onChange={setType}
              />
            </div>
          </div>

          <div className="drawer-box__form">
            <div className="drawer-box__form__label">Период акции</div>
            <div className="drawer-box__form__form">
              <Input
                className="text-dark"
                value={date || "00.00.0000 - 00.00.0000"}
                theme="dark"
                Icon={CalendarIcon}
                onChange={setDate}
              />
            </div>
          </div>

          <hr />

          <div className="drawer-box__category">
            <div className="drawer-box__form">
              <div className="drawer-box__form__label">Категория</div>
              <div className="drawer-box__form__form">
                <Select
                  className="text-dark"
                  value={category || "Выберите категорию"}
                  theme="green"
                  variants={["Полуфабрикаты", "Напитки", "Корм для животных"]}
                  onChange={setCategory}
                />
              </div>
            </div>

            <div className="drawer-box__category__wrapper">
              <div className="drawer-box__category__controls">
                <img src={PlusGreenBox} alt="Plus Icon" />
              </div>

              <div className="drawer-box__category__block">
                <div className="drawer-box__category__article">
                  <Input value="000000" theme="green" />
                </div>
                <div className="drawer-box__category__name">
                  <Select
                    value="Поиск по наименованию"
                    variants={["Винегрет", "Snickers", "Пельмени Цезарь"]}
                    onChange={console.log}
                  />
                </div>
                <div className="drawer-box__category__value">
                  <Input value="0.00" onChange={console.log} />
                </div>
                <div className="drawer-box__category__percent">
                  <Input value="-0%" onChange={console.log} />
                </div>
              </div>
            </div>

            <Input
              value="Добавить категорию"
              theme="dark"
              Icon={PlusBox}
              onChange={console.log}
            />
          </div>

          <div className="drawer-box__form">
            <div className="drawer-box__form__label">Описание</div>
            <div className="drawer-box__form__form">
              <div className="drawer-box__textarea">
                <Textarea
                  value={
                    desc ||
                    "Состав креветки (Pandalus borealis), вода (защитная глазурь). Краткое описание Варено-мороженые водные беспозвоночные. Глазурь не более 14%. Зона вылова: Северные районы Атлантического океана."
                  }
                  onChange={setDesc}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
