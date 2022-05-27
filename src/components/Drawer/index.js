import "./index.css";

import { Input, Textarea } from "..";

import CalendarIcon from "../../assets/icons/calendar.svg";
import PlusBox from "../../assets/icons/plus_box.svg";

export const Drawer = () => {
  return (
    <div className="drawer-box">
      <div className="drawer-box__current">
        <div className="drawer-box__title">
          <div className="drawer-box__title__text">Добавление скидки</div>
          <div className="drawer-box__title__close">X</div>
        </div>

        <div className="drawer-box__content">
          {/*<Select value="Выберите тип скидки" />*/}

          <Input
            value="00.00.0000 - 00.00.0000"
            theme="dark"
            Icon={CalendarIcon}
          />

          <hr />

          <div className="drawer-box__category">
            <div className="drawer-box__category__current">
              <div className="drawer-box__category__controls">+</div>
              <div className="drawer-box__category__block">
                <div className="drawer-box__category__article">
                  <div className="drawer-box__category__article-number">
                    000000
                  </div>
                  <div className="drawer-box__category__article-name">
                    Поиск по наименованию
                  </div>
                </div>
                <div className="drawer-box__category__value">
                  <div className="drawer-box__category__value-number">0.00</div>
                  <div className="drawer-box__category__value-percent">-0%</div>
                </div>
              </div>
            </div>

            {/*<Select value="Выберите категорию" theme="green" />*/}
            <Input value="Добавить категорию" theme="dark" Icon={PlusBox} />
          </div>

          <div className="drawer-box__textarea">
            <Textarea
              readOnly
              value={
                "Состав креветки (Pandalus borealis), вода (защитная глазурь). Краткое описание Варено-мороженые водные беспозвоночные. Глазурь не более 14%. Зона вылова: Северные районы Атлантического океана."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
