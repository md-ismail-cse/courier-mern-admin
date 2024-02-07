import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const HomeItems = () => {
  const [parcels, setParcels] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [branches, setBranches] = useState(null);
  const [riders, setRiders] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  // GEL PARCELS
  useEffect(() => {
    const fatchParcels = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setParcels(data.length);
    };
    fatchParcels();
  }, [parcels]);

  // GEL CONTACTS
  useEffect(() => {
    const fatchContacts = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/contacts",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setContacts(data.length);
    };
    fatchContacts();
  }, [contacts]);

  // GEL CUSTOMERS
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/customers",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setCustomers(data.length);
    };
    fatchCustomers();
  }, [customers]);

  // GEL BRANCHES
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
      setBranches(data.length);
    };
    fatchBranches();
  }, [branches]);

  // GEL RIDERS
  useEffect(() => {
    const fatchRiders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/riders",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setRiders(data.length);
    };
    fatchRiders();
  }, [riders]);

  // GEL ADMIN
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/admin",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setAdmin(data.length);
      setLoading(true);
    };
    fatchAdmin();
  }, [admin]);

  return (
    <>
      {loading ? (
        <div className="dashboardItems">
          <Link to="/parcels">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Parcel</h4>
                <span>{parcels}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-truck-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/contacts">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Message</h4>
                <span>{contacts}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-mail-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/customers">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Customer</h4>
                <span>{customers}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-group-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/branches">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Branch</h4>
                <span>{branches}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-git-merge-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/riders">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Rider</h4>
                <span>{riders}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-takeaway-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/admin">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Admin</h4>
                <span>{admin}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-user-settings-line"></i>
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeItems;
