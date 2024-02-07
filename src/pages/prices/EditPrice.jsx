import { InputAdornment, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const EditPrice = () => {
  const { id } = useParams();
  // GET BRANCHES
  const [branches, setBranches] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchBranches = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/branches",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setBranches(data);
    };
    fatchBranches();
  }, [branches]);

  // GET PRICE
  const [sendLocation, setSendLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    const fatchPrices = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/prices/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setSendLocation(data.sendLocation);
      setEndLocation(data.endLocation);
      setDuration(data.duration);
      setPrice(data.price);
      setLoading(true);
    };
    fatchPrices();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      sendLocation,
      endLocation,
      duration,
      price,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER + `/api/admin/prices/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
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
        }).then(() => (window.location.href = "/prices"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  return (
    <>
      <div className="editPrice">
        <Title title="Edit delivery charge" />
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
                  label="Duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  InputProps={
                    ({ inputProps: { min: 0 } },
                    {
                      startAdornment: (
                        <InputAdornment position="start">Day</InputAdornment>
                      ),
                    })
                  }
                />
                <TextField
                  required
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={
                    ({ inputProps: { min: 0 } },
                    {
                      startAdornment: (
                        <InputAdornment position="start">৳</InputAdornment>
                      ),
                    })
                  }
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

export default EditPrice;
