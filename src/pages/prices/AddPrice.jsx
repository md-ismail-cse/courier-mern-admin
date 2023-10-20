import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const AddPrice = () => {
  // GET BRANCHES
  const [branches, setBranches] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchBranches = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/branches"
      );
      setBranches(data);
      setLoading(true);
    };
    fatchBranches();
  }, [branches]);

  const [sendLocation, setSendLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      sendLocation,
      endLocation,
      price,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/prices", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Price added.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/prices"));
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
      <div className="addPrice">
        <Title title="Add delivery cost" />
        <div className="content">
          <div className="form-box">
            {laoding ? (
              <form className="form" onSubmit={submitHandler}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Send location"
                  value={sendLocation}
                  onChange={(e) => setSendLocation(e.target.value)}
                >
                  {branches.map((item) => (
                    <MenuItem key={item.branch} value={item.branch}>
                      {item.branch}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  label="End location"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                >
                  {branches.map((item) => (
                    <MenuItem key={item.branch} value={item.branch}>
                      {item.branch}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  type="number"
                  InputProps={
                    ({ inputProps: { min: 0 } },
                    {
                      startAdornment: (
                        <InputAdornment position="start">৳</InputAdornment>
                      ),
                    })
                  }
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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

export default AddPrice;
