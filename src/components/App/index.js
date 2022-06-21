import { useState } from "react";
import "./index.scss";

// Components
import { Header } from "./Header";
import { Controls } from "./Controls";
import { Board, Modal } from "../";

export const App = () => {
  const [showModal, toggleModal] = useState(false);
  return (
    <main className="discount-main">
      <Header />
      <Controls toggleModal={toggleModal} />
      <Board />

      {showModal && <Modal toggleModal={toggleModal} />}
    </main>
  );
};
