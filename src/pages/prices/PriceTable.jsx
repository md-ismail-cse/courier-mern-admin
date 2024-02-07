import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const PriceTable = () => {
  // GET PRICES
  const [prices, setPrices] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchPrices = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/prices",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setPrices(data);
      setLoading(true);
    };
    fatchPrices();
  }, [prices]);

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
          .delete(process.env.REACT_APP_SERVER + `/api/admin/prices/${id}`, {
            headers: {
              Authorization: localStorage.getItem("aToken"),
            },
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Price delete field!",
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
    },
    {
      field: "sendLocation",
      headerName: "Send location",
      width: 150,
    },
    {
      field: "endLocation",
      headerName: "End location",
      width: 150,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      valueGetter: (params) => `${params.row.duration} Days`,
    },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      valueGetter: (params) => `${params.row.price} ৳`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link to={"/prices/edit-price/" + params.row._id} className="edit">
              <i className="ri-edit-fill"></i>
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
              rows={prices}
              getRowId={(row) => row._id}
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

export default PriceTable;
