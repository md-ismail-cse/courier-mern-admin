import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";

const ContactTable = () => {
  // GET CONTACT
  const [contacts, setContacts] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchContacts = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/contacts"
      );
      setContacts(data);
      setLoading(true);
    };
    fatchContacts();
  }, [contacts]);

  // DELETE CONTACT
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
          .delete(process.env.REACT_APP_SERVER + `/api/admin/contacts/${id}`)
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Contact delete field!",
            });
          });
      }
    });
  };

  // OPEN CONTACT
  const viewHandler = (id) => {
    axios
      .put(process.env.REACT_APP_SERVER + `/api/admin/contacts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.location.href = `/contacts/${id}`;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Message read status update field!",
        });
      });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link onClick={() => viewHandler(params.row._id)}>
              {params.row._id}
            </Link>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 150,
    },
    {
      field: "message",
      headerName: "Message",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      type: "date",
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link onClick={() => viewHandler(params.row._id)} className="view">
              <i className="ri-eye-fill"></i>
            </Link>
            <Link
              className="delete"
              onClick={() => deleteHandler(params.row._id)}
            >
              <i className="ri-delete-bin-line"></i>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="dataTable">
        <Box sx={{ width: "100%" }}>
          {laoding ? (
            <DataGrid
              rows={contacts}
              getRowId={(row) => row._id}
              getRowClassName={(params) => {
                return params.row.read === "No" && "bold";
              }}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              disableRowSelectionOnClick
              disableColumnFilter
              disableDensitySelector
              disableColumnSelector
              disableColumnMenu
            />
          ) : (
            <Loader />
          )}
        </Box>
      </div>
    </>
  );
};

export default ContactTable;
