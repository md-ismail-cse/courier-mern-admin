import Title from "../../components/title/Title";
import BranchTable from "./BranchTable";
import { Button } from "@mui/material";

const Branches = () => {
  return (
    <div>
      <div className="branches">
        <Title title="Branches" />
        <div className="content">
          <Button
            href="/branches/add-branch"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add new branch
          </Button>
          <BranchTable />
        </div>
      </div>
    </div>
  );
};

export default Branches;
