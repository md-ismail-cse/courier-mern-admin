import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const ParcelTable = () => {
  // GET PARCELS
  const [parcels, setParcels] = useState([]);
  const [laoding, setLoading] = useState(false);
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
      setParcels(data);
      setLoading(true);
    };
    fatchParcels();
  }, [parcels]);

  // Delete parcel
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
          .delete(process.env.REACT_APP_SERVER + `/api/admin/parcels/${id}`, {
            headers: {
              Authorization: localStorage.getItem("aToken"),
            },
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

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"/parcels/" + params.row._id}>{params.row._id}</Link>
          </div>
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer",
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"/customers/" + params.row.customerID}>
              {params.row.customerName}
            </Link>
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "weight",
      headerName: "Weight",
      valueGetter: (params) => `${params.row.weight} kg`,
    },
    {
      field: "totalPrice",
      headerName: "Total price",
      valueGetter: (params) => `${params.row.totalPrice} ৳`,
    },
    {
      field: "payment",
      headerName: "Payment",
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return <span className={params.row.status}>{params.row.status}</span>;
      },
    },
    {
      field: "recName",
      headerName: "recName",
    },
    {
      field: "recPhone",
      headerName: "recPhone",
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"tel:" + params.row.recPhone}>{params.row.recPhone}</Link>
          </div>
        );
      },
    },
    {
      field: "recEmail",
      headerName: "recEmail",
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"mailto:" + params.row.recEmail}>
              {params.row.recEmail}
            </Link>
          </div>
        );
      },
    },
    {
      field: "recAddress",
      headerName: "recAddress",
    },
    {
      field: "sendLocation",
      headerName: "Send",
    },
    {
      field: "endLocation",
      headerName: "End",
    },
    {
      field: "orderDate",
      headerName: "orderDate",
      type: "date",
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "acceptTime",
      headerName: "acpDate",
      renderCell: (params) => {
        return (
          <>
            {params.row.acceptTime
              ? new Date(params.row.acceptTime).toLocaleString()
              : "NaN"}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link to={"/parcels/" + params.row._id} className="edit">
              <i class="ri-edit-fill"></i>
            </Link>
            <Link
              className="delete"
              onClick={() => deleteHandler(params.row._id)}
            >
              <i class="ri-delete-bin-line"></i>
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
              rows={parcels}
              getRowId={(row) => row._id}
              getRowClassName={(params) => {
                return params.row.status === "Ordered" && "bold";
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
              pageSizeOptions={[5, 10, 20]}
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

export default ParcelTable;
