import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

const ListRestoreButton = ({ onClick }) => {
  return (
    <Tooltip title="Restaurar" data-testid="tooltip-container" placement="bottom" arrow>
      <IconButton sx={{ color: "#283b54" }} data-testid="restore-button" onClick={onClick}>
        <RestoreIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListRestoreButton;
