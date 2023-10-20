import Title from "../../components/title/Title";
import HomeItems from "./HomeItems";

const Home = () => {
  return (
    <>
      <div className="dashboard">
        <Title title="Dashboard" />
        <div className="content">
          <HomeItems />
        </div>
      </div>
    </>
  );
};

export default Home;
