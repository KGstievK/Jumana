import scss from "./sideBar.module.scss";
const SideBar = () => {
  return (
    <div className={scss.SideBar}>
      <div className={scss.container}>
        <div className={scss.content}>
          <div className={scss.categories}></div>
          <div className={scss.categories}></div>
          <div className={scss.categories}></div>
          <div className={scss.categories}></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
