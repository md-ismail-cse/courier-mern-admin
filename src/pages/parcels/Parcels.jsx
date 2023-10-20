import Title from "../../components/title/Title";
import ParcelTable from "./ParcelTable";

const Parcels = () => {
  return (
    <>
      <div className="parcels">
        <Title title="Parcels" />
        <div className="content">
          <ParcelTable />
        </div>
      </div>
    </>
  );
};

export default Parcels;
