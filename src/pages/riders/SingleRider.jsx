import Title from "../../components/title/Title";
import { Avatar } from "@mui/material";
import RiderParcels from "./RiderParcels";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
const SingleRider = () => {
  // GET RIDER DETAILS
  const { id } = useParams();
  const [rider, setRider] = useState({});
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchRider = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/riders/${id}`
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
                            src={"/riders/" + rider.thumb}
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
                      <td>{rider.email}</td>
                    </tr>
                    <tr>
                      <th>Phone:</th>
                      <td>{rider.phone}</td>
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
