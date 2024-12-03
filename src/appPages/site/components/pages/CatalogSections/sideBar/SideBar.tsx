import scss from "./sideBar.module.scss";
const SideBar = () => {
  return (
    <div className={scss.SideBar}>
      <div className={scss.container}>
        SideBar
        <div className={scss.content}>
          <h3>вид</h3>

          <form>
            <input type="checkbox" />
            <h4>платье</h4>
          </form>

          <form>
            <input type="checkbox" />
            <h4>платье</h4>
          </form>
          <form>
            <input type="checkbox" />
            <h4>платье</h4>
          </form>
          <form>
            <input type="checkbox" />
            <h4>платье</h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
