import New from "./HomeSections/New/New";
import Popular from "./HomeSections/Popular/Popular";
import Welcome from "./HomeSections/Welcome/Welcome";

const Home = () => {
  return (
    <div>
      <Welcome />
      <New/>
      <Popular/>
    </div>
  );
};

export default Home;
