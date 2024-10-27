import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({}) => ({
  border: "none",
  borderRadius: "15px",
  "& .MuiDataGrid-main": {
    overflow: "hidden",
  },
  "& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer": {
    backgroundColor: "#283b54",
    color: "#ffffff",
    borderRadius: 0,
    fontSize: "15px",
  },
  "& .MuiDataGrid-cell": {
    backgroundColor: "white",
    borderBottom: "none",
    color: "#283b54",
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-menuIcon, & .MuiDataGrid-sortIcon": {
    color: "#ffffff",
  },
  "& .MuiCheckbox-root": {
    color: "#ffffff",
  },
  "& .MuiTablePagination-root": {
    color: "#ffffff",
  },
  "& .MuiDataGrid-toolbarContainer": {
    backgroundColor: "#283b54",
    padding: "8px 16px",
  },
  "& .MuiButton-root": {
    color: "#ffffff",
  },
}));

export default StyledDataGrid;
