import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";
import CustomerParcels from "./CustomerParcels";

const SingleCustomer = () => {
  // GET CUSTOMER DETAILS
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setCustomer(data);
      setLoading(true);
    };
    fatchCustomer();
  }, [customer, id]);

  if (customer.message === "No data found!") {
    window.location.href = "/customers";
  }
  return (
    <>
      <div className="singleCustomer">
        <Title title="Customer Details" />
        <div className="content">
          <div className="customerProfile">
            <div className="profileBox">
              {laoding ? (
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
                      <td>{customer.name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td className="tableLink">
                        <Link to={"mailto:" + customer.email}>
                          {customer.email}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Phone:</th>
                      <td className="tableLink">
                        <Link to={"tel:" + customer.phone}>
                          {customer.phone}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Gender:</th>
                      <td>{customer.gender}</td>
                    </tr>
                    <tr>
                      <th>Address:</th>
                      <td>{customer.address}</td>
                    </tr>
                    <tr>
                      <th>Joinging Date:</th>
                      <td>{new Date(customer.date).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="customerParcels">
            <CustomerParcels />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCustomer;
