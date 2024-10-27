import React from "react";
import { Snackbar, Alert } from "@mui/material";

const ListSnackBar = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ListSnackBar;
