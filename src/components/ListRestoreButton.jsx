import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

const ListRestoreButton = ({ onClick }) => {
  return (
    <Tooltip title="Restaurar" placement="bottom" arrow>
      <IconButton sx={{ color: "#283b54" }} aria-label="Restore" onClick={onClick}>
        <RestoreIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListRestoreButton;
