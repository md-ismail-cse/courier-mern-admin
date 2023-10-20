import { useState } from "react";
import Title from "../../components/title/Title";
import { TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      phone,
      address,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/admin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Admin added successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/admin"));
        } else if (response.data.message === "Already registered.") {
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
          text: "Something wrong.",
        });
      });
  };
  return (
    <>
      <div className="addAdmin">
        <Title title="Add new admin" />
        <div className="content">
          <div className="form-box">
            <form className="form" onSubmit={submitHandler}>
              <TextField
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                defaultValue="admin"
                InputProps={{
                  readOnly: true,
                }}
                helperText={
                  '"admin" is a default password. Its can be change later.'
                }
              />

              <TextField
                required
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

export default AddAdmin;
