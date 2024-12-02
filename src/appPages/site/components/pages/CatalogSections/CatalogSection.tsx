import Cards from "./cards/Cards";
import scss from "./CatalogSection.module.scss";
import SideBar from "./sideBar/SideBar";

const CatalogSection = () => {
  return (
    <section className={scss.CatalogSection}>
      <div className="container">
        <div className={scss.content}>
          <SideBar />
          <Cards />
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
