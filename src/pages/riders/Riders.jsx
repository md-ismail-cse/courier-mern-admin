import Title from "../../components/title/Title";
import RiderTable from "./RiderTable";
import { Button } from "@mui/material";

const Riders = () => {
  return (
    <>
      <div className="riders">
        <Title title="Riders" />
        <div className="content">
          <Button
            href="/riders/add-rider"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add new rider
          </Button>
          <RiderTable />
        </div>
      </div>
    </>
  );
};

export default Riders;
