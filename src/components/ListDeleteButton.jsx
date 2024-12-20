import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ListDeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Borrar" placement="bottom" arrow>
      <IconButton sx={{ color: "#283b54" }} data-testid="delete-button" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListDeleteButton;
