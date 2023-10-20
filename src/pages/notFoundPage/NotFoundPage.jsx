import Title from "../../components/title/Title";
import { Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <>
      <div className="notFoundPage">
        <Title title="Page Not Found" />
        <div className="content">
          <h1>404</h1>
          <h3>Not Found Page!</h3>
          <p>You entered invalid link</p>
          <Button
            href="/"
            className="btnPrimary"
            variant="contained"
            size="small"
          >
            Back Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
