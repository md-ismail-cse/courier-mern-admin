// import "./profile.css";
import { Avatar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const ChangePicture = () => {
  const [currentThumb, setThumb] = useState("");
  const [loading, setLoading] = useState(false);

  // GET ADMIN DETAILS
  const id = localStorage.getItem("aID");
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/admin/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setThumb(data.thumb);
      setLoading(true);
    };
    fatchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/api/admin/admin/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("aToken"),
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/profile"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className="changePicture">
        <Title title="Change Profile Picture" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <form
                className="form"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                {file ? (
                  <Avatar alt="" src={file} />
                ) : (
                  <Avatar
                    src={
                      process.env.REACT_APP_SERVER + "/admin/" + currentThumb
                    }
                    alt=""
                  />
                )}
                <TextField
                  required
                  fullWidth
                  type="file"
                  onChange={handleThumbChange}
                  id="thumb"
                />
                <input type="submit" className="btnPrimary" />
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePicture;
