import "./index.css";

import { Button } from "../Button";

import { CrossIcon } from "../../assets/icons";

export const Modal = () => {
  return (
    <div className="modal">
      <div className="modal__current">...</div>
      <div className="modal__close-button">
        <Button leftIcon={CrossIcon} />
      </div>
    </div>
  );
};
