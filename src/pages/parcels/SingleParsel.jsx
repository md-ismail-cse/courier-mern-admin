import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { Avatar, Button, MenuItem, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";

const SingleParsel = () => {
  // GET PARCEL DETAILS
  const { id } = useParams();
  const [parcel, setParcel] = useState({});
  const [customerID, setCustomerID] = useState("");
  const [status, setStatus] = useState("");
  const [picRiderID, setPicRiderID] = useState("");
  const [dlvRiderID, setDlvRiderID] = useState("");
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`
      );
      setParcel(data);
      setCustomerID(data.customerID);
      setStatus(data.status);
      setPicRiderID(data.picRiderID);
      setDlvRiderID(data.picRiderID);
      setLoading(true);
    };
    fatchCustomer();
  }, []);

  // GET CUSTOMER DETAILS
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${customerID}`
      );
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer, customerID]);

  // GET RIDERS
  const [riders, setRiders] = useState([]);
  useEffect(() => {
    const fatchRiders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/riders"
      );
      setRiders(data);
    };
    fatchRiders();
  }, []);

  const statusItems = [
    { title: "Ordered", value: "Ordered" },
    { title: "Accepted", value: "Accepted" },
    { title: "Ondelivery", value: "Ondelivery" },
    { title: "Delivered", value: "Delivered" },
  ];

  // GET RIDER DETAILS
  const [picRider, setPicRider] = useState({});
  const [dlvRider, setDlvRider] = useState({});
  useEffect(() => {
    if (parcel.picRiderID !== "NaN") {
      const fatchPicRider = async () => {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER +
            `/api/admin/riders/${parcel.picRiderID}`
        );
        setPicRider(data);
      };
      fatchPicRider();
    }
    if (parcel.dlvRiderID !== "NaN") {
      const fatchDlvRider = async () => {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER +
            `/api/admin/riders/${parcel.dlvRiderID}`
        );
        setDlvRider(data);
      };
      fatchDlvRider();
    }
  }, [picRider, parcel.picRiderID, dlvRider, parcel.dlvRiderID]);

  // UPDATE PARCEL
  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      status,
      acceptTime: new Date(),
      picRiderID,
      dlvRiderID,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`,
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
          text: "Parcel updated successfull.",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/parcels"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parcel update field!",
        });
      });
  };

  // Parcel delete
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Parcel deleted!.",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/parcels"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Parcel delete field!",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="singleParcel">
        <Title title="Parcel Details" />
        <div className="content">
          {laoding ? (
            <div className="parcelInner">
              <div className="parcelBox">
                <h4>Customer Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          {customer.thumb ? (
                            <Avatar
                              alt={customer.name}
                              src={
                                process.env.REACT_APP_SERVER +
                                "/customers/" +
                                customer.thumb
                              }
                            />
                          ) : (
                            <Avatar
                              alt={customer.name}
                              src="/img/placeholder.png"
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Name:</th>
                        <td>
                          <Link to={"/customers/" + customer._id}>
                            {customer.name}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{customer.email}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>{customer.phone}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{customer.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Parcel Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Type:</th>
                        <td>{parcel.type}</td>
                      </tr>
                      <tr>
                        <th>Weight:</th>
                        <td>{parcel.weight} kg</td>
                      </tr>
                      <tr>
                        <th>Total price:</th>
                        <td>{parcel.totalPrice} ৳</td>
                      </tr>
                      <tr>
                        <th>Payment:</th>
                        <td>{parcel.payment}</td>
                      </tr>
                      <tr>
                        <th>Status:</th>
                        <td>
                          <span className={parcel.status}>{parcel.status}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Order Date:</th>
                        <td>{new Date(parcel.orderDate).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>Accept Date:</th>
                        <td>{new Date(parcel.acceptTime).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Delivery Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Name:</th>
                        <td>{parcel.recName}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>{parcel.recPhone}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{parcel.recEmail}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{parcel.recAddress}</td>
                      </tr>
                      <tr>
                        <th>Send:</th>
                        <td>{parcel.sendLocation}</td>
                      </tr>
                      <tr>
                        <th>End:</th>
                        <td>{parcel.endLocation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {parcel.picRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Pickup Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {picRider.thumb ? (
                              <Avatar
                                src={
                                  process.env.REACT_APP_SERVER +
                                  "/riders/" +
                                  picRider.thumb
                                }
                                alt={picRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={picRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>
                            <Link to={"/riders/" + picRider._id}>
                              {picRider.name}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{picRider.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>{picRider.phone}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{picRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {parcel.dlvRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Delivery Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {dlvRider.thumb ? (
                              <Avatar
                                src={
                                  process.env.REACT_APP_SERVER +
                                  "/riders/" +
                                  dlvRider.thumb
                                }
                                alt={dlvRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={dlvRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>
                            <Link to={"/riders/" + dlvRider._id}>
                              {dlvRider.name}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{dlvRider.email}</td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>{dlvRider.phone}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{dlvRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="parcelBox">
                <h4>Actions</h4>
                <div className="form-box">
                  <form className="form" onSubmit={submitHandler}>
                    <TextField
                      fullWidth
                      select
                      label="Pickup rider"
                      // value={picRiderID !== "NaN" && picRiderID}
                      onChange={(e) => setPicRiderID(e.target.value)}
                    >
                      {riders.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      select
                      label="Delivery rider"
                      // value={dlvRiderID !== "NaN" && dlvRiderID}
                      onChange={(e) => setDlvRiderID(e.target.value)}
                    >
                      {riders.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      select
                      label="Parcel status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {statusItems.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </TextField>
                    <input type="submit" className="btnPrimary" />
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => deleteHandler(id)}
                    >
                      Delete parcel
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleParsel;
