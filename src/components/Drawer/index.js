import { forwardRef, useState } from "react";
import "./index.css";

import { Input, Textarea, Select } from "..";

import { CalendarIcon, PlusBox, PlusGreenBox } from "../../assets/icons";

import mocks from "../../__mocks__";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Drawer = () => {
  const [type, setType] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [category, setCategory] = useState(null);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([mocks.Drawer.product]);

  const addNewProduct = () => {
    const newProductsArray = [...products, mocks.Drawer.product];
    setProducts(newProductsArray);
  };

  const removeProduct = (index) => {
    const newProductsArray = products.filter(
      (_, productIndex) => productIndex !== index
    );

    setProducts(newProductsArray);
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      ref={ref}
      className="text-dark"
      defaultValue={value || mocks.Drawer.period}
      theme="dark"
      Icon={CalendarIcon}
      // onChange={setDate}
      onClick={onClick}
    />
  ));

  const DrawProducts = () =>
    products.map((product, index) => {
      const isRemoveButton = index !== products.length - 1;
      return (
        <div key={index} className="drawer-box__category__wrapper">
          <div
            className="drawer-box__category__controls"
            onClick={() =>
              isRemoveButton ? removeProduct(index) : addNewProduct()
            }
          >
            <img
              src={isRemoveButton ? PlusBox : PlusGreenBox}
              alt="Plus Icon"
            />
          </div>

          <div className="drawer-box__category__block">
            <div className="drawer-box__category__article">
              <Input
                defaultValue={product.article}
                theme="green"
                onChange={console.log}
              />
            </div>
            <div className="drawer-box__category__name">
              <Select
                value="Поиск по наименованию"
                variants={mocks.Drawer.products}
                onChange={console.log}
              />
            </div>
            <div className="drawer-box__category__value">
              <Input
                maskType="float"
                defaultValue="0.00"
                onChange={console.log}
              />
            </div>
            <div className="drawer-box__category__percent">
              <Input
                maskType="percent"
                defaultValue={`${product.discount}%`}
                onChange={console.log}
              />
            </div>
          </div>
        </div>
      );
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
                variants={mocks.Drawer.discountTypes}
                onChange={setType}
              />
            </div>
          </div>

          <div className="drawer-box__form">
            <div className="drawer-box__form__label">Период акции</div>
            <div className="drawer-box__form__form">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={setDateRange}
                isClearable={true}
                customInput={<CustomDateInput />}
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
                  variants={mocks.Drawer.categories}
                  onChange={setCategory}
                />
              </div>
            </div>

            <DrawProducts />

            <Input
              defaultValue="Добавить категорию"
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
                  value={desc || mocks.Drawer.desc}
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
