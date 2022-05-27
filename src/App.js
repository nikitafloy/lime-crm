import { Drawer, Input, Select } from "./components";

import SearchIcon from "./assets/icons/search.svg";
import CalendarIcon from "./assets/icons/calendar.svg";

export const App = () => {
  return (
    <div className="App">
      <Input theme="green" value="000000" />
      <Input value="Добавить категорию" Icon={SearchIcon} />
      <Input theme="dark" value="00.00.0000 - 00.00.0000" Icon={CalendarIcon} />

      <Input value="Добавить категорию" />

      <Select value="Выберите тип скидки" />
      {/*<Select theme="dark" value="Выберите тип скидки" />*/}
      {/*<Select theme="green" value="Выберите тип скидки" />*/}
      <Select value="Полуфабрикаты" label={"Категория товаров"} />

      <Drawer />
    </div>
  );
};
