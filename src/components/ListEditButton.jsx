import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ListEditButton = ({ onClick }) => {
  return (
    <Tooltip title="Editar" placement="bottom" arrow>
      <IconButton sx={{ color: "#283b54" }} onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListEditButton;
