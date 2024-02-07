import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  // Get parcels
  const [parcels, setParcels] = useState([]);
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
      const newParcles = data.filter((curData) => {
        return curData.status !== "Delivered";
      });
      setParcels(newParcles);
    };
    fatchParcels();
  }, [parcels]);

  // Get contacts
  const [contacts, setContacts] = useState([]);
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
      const newContacts = data.filter((curData) => {
        return curData.read === "No";
      });
      setContacts(newContacts);
    };
    fatchContacts();
  }, [contacts]);

  // Get current logged admin
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState([]);
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
      setAdmin(data);
    };
    fatchAdmin();
  }, [admin, id]);

  // Logout
  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aID");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <div></div>
        <div className="icons">
          <Link to="/parcels">
            <div className="notification">
              <i className="ri-truck-line"></i>
              <span>{parcels.length}</span>
            </div>
          </Link>
          <Link to="/contacts">
            <div className="notification">
              <i className="ri-mail-line"></i>
              <span>{contacts.length}</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="user">
              {admin.thumb ? (
                <img
                  src={process.env.REACT_APP_SERVER + "/admin/" + admin.thumb}
                  alt={admin.name}
                />
              ) : (
                <img src="/img/placeholder.png" alt={admin.name} />
              )}
              <span>{admin.name}</span>
            </div>
          </Link>
          <i
            className="ri-logout-circle-r-line"
            onClick={() => logout()}
            title="Logout"
          ></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
