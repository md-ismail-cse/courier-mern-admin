import Title from "../../components/title/Title";
import AdminTable from "./AdminTable";
import { Button } from "@mui/material";

const Admin = () => {
  return (
    <div>
      <div className="admin">
        <Title title="Admin" />
        <div className="content">
          <Button
            href="/admin/add-admin"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add new admin
          </Button>
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default Admin;
