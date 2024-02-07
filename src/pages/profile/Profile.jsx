import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const Profile = () => {
  // Get current logged admin
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    };
    fatchAdmin();
  }, [admin, id]);

  return (
    <div>
      <div className="profile">
        <Title title="Profile" />
        <div className="content">
          <div className="profileBox">
            {loading ? (
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <Avatar
                        alt={admin.name}
                        src={
                          process.env.REACT_APP_SERVER + "/admin/" + admin.thumb
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>{admin.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{admin.email}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{admin.phone}</td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td>{admin.gender}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>{admin.address}</td>
                  </tr>
                  <tr>
                    <th>Joinging Date:</th>
                    <td>{new Date(admin.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Button
                        href="/profile/edit-details"
                        variant="contained"
                        size="small"
                      >
                        Edit Details
                      </Button>
                      <Button
                        href="/profile/change-picture"
                        variant="contained"
                        size="small"
                      >
                        Change Picture
                      </Button>
                      <Button
                        href="/profile/change-password"
                        variant="contained"
                        size="small"
                      >
                        Change Password
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
