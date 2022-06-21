import { useState } from "react";
import "./index.scss";

// Components
import { Button } from "../../Button";

// Inline SVG
import InlineSVG from "svg-inline-react";

// Icons
import { BellIcon, TargetPoint, UserIcon } from "../../../assets/icons";

// Mocks
import mocks from "../../../__mocks__";

export const Header = () => {
  const [products] = useState(mocks.Modal.productsCount);
  const [discounts] = useState(mocks.Modal.discountsCount);
  const [address] = useState(mocks.Modal.address);
  const [user] = useState(mocks.Modal.user);
  const [notifications] = useState(mocks.Modal.notifications);

  return (
    <header className="discount-header">
      <div className="discount-left">
        <div className="discount-top">
          <div className="discount-stats discount-stats_disabled">
            <div className="discount-stats__name">Товары</div>
            <div className="discount-stats__count">{products}</div>
          </div>

          <div className="discount-stats">
            <div className="discount-stats__name">Скидки</div>
            <div className="discount-stats__count">{discounts}</div>
          </div>
        </div>

        <div className="discount-bottom">
          <div className="discount-bottom__icon">
            <InlineSVG
              element="div"
              style={{ display: "flex" }}
              src={TargetPoint}
            />
          </div>

          <div className="discount-bottom__address">{address}</div>
        </div>
      </div>

      <div className="discount-right">
        <div className="discount-user">
          <Button
            type="lg"
            className="discount-font-weight-bold"
            LeftIcon={UserIcon}
            value={user.name}
            secondText={user.position}
          />
        </div>

        <div className="discount-notification">
          <Button type="lg" LeftIcon={BellIcon} />
          <div className="discount-notification__icon">{notifications}</div>
        </div>
      </div>
    </header>
  );
};
