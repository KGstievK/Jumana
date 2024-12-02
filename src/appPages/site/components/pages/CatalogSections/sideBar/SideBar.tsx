import scss from "./sideBar.module.scss";
const SideBar = () => {
  return (
    <div className={scss.SideBar}>
      <div className={scss.content}>SideBar</div>
    </div>
  );
};

export default SideBar;
