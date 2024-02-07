import { Button } from "@mui/material";
import Title from "../../components/title/Title";
import PriceTable from "./PriceTable";

const Prices = () => {
  return (
    <>
      <div className="prices">
        <Title title="Delivery charge" />
        <div className="content">
          <Button
            href="/prices/add-price"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add new delivery charge
          </Button>
          <PriceTable />
        </div>
      </div>
    </>
  );
};

export default Prices;
