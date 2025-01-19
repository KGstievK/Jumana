import s from "./TabBAr.module.scss";
import { TiHome } from "react-icons/ti";

const Tabbar = () => {
  return (
    <div className={s.TabBar}>
      <div className={s.content}>
        <div className={s.block}>
          <span>
            <TiHome />
          </span>
          <h4>Главная</h4>
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
