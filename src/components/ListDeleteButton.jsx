import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ListDeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Borrar" placement="right" arrow>
      <IconButton sx={{ color: "black" }} onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListDeleteButton;
