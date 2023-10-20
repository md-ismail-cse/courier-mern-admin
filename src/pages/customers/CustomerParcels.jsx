import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const CustomerParcels = () => {
  // GET PARCELS
  const { id } = useParams();
  const [parcels, setParcels] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchPrices = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels"
      );
      const newParcels = data.filter((curData) => {
        return curData.customerID === id;
      });
      setParcels(newParcels);
      setLoading(true);
    };
    fatchPrices();
  }, [parcels, id]);

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
      headerName: "",
      width: 10,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link to={"/parcels/" + params.row._id} className="view">
              <i className="ri-eye-fill"></i>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h4 className="text-center">Rider Parcels</h4>
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

export default CustomerParcels;
