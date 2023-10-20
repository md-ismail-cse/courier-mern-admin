import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";

const EditBranch = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchBranch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/branches/${id}`
      );
      setBranch(data.branch);
      setAddress(data.address);
      setLoading(true);
    };
    fatchBranch();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      branch,
      address,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER + `/api/admin/branches/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/branches"));
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
      <div className="editBranch">
        <Title title="Edit branch" />
        <div className="content">
          <div className="form-box">
            {laoding ? (
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
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBranch;
