import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Title from "../../components/title/Title";

const AddBranch = () => {
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      branch,
      address,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/branches", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("aToken"),
        },
      })
      .then((response) => {
        if (response.data.message === "Branch added.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/branches"));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something wrong!",
        });
      });
  };
  return (
    <>
      <div className="addBranch">
        <Title title="Add new branch" />
        <div className="content">
          <div className="form-box">
            <form className="form" onSubmit={submitHandler}>
              <TextField
                required
                fullWidth
                label="Branch name"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input type="submit" className="btnPrimary" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBranch;
