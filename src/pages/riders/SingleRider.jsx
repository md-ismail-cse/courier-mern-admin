import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";
import RiderParcels from "./RiderParcels";
const SingleRider = () => {
  // GET RIDER DETAILS
  const { id } = useParams();
  const [rider, setRider] = useState({});
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchRider = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/riders/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setRider(data);
      setLoading(true);
    };
    fatchRider();
  }, [rider, id]);

  if (rider.message === "No data found!") {
    window.location.href = "/riders";
  }

  return (
    <div>
      <div className="singleRider">
        <Title title="Rider Details" />
        <div className="content">
          <div className="riderProfile">
            <div className="profileBox">
              {laoding ? (
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        {rider.thumb ? (
                          <Avatar
                            alt={rider.name}
                            src={
                              process.env.REACT_APP_SERVER +
                              "/riders/" +
                              rider.thumb
                            }
                          />
                        ) : (
                          <Avatar alt={rider.name} src="/img/placeholder.png" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Name:</th>
                      <td>{rider.name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td className="tableLink">
                        <Link to={"mailto:" + rider.email}>{rider.email}</Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Phone:</th>
                      <td className="tableLink">
                        <Link to={"tel:" + rider.phone}>{rider.phone}</Link>
                      </td>
                    </tr>
                    <tr>
                      <th>Gender:</th>
                      <td>{rider.gender}</td>
                    </tr>
                    <tr>
                      <th>Address:</th>
                      <td>{rider.address}</td>
                    </tr>
                    <tr>
                      <th>Joinging Date:</th>
                      <td>{new Date(rider.date).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="riderParcels">
            <RiderParcels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRider;
