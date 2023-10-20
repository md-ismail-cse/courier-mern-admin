import Title from "../../components/title/Title";
import CustomerTable from "./CustomerTable";

const Customers = () => {
  return (
    <>
      <div className="customers">
        <Title title="Customers" />
        <div className="content">
          <CustomerTable />
        </div>
      </div>
    </>
  );
};

export default Customers;
