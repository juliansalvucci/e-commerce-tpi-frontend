import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

const ListRestoreButton = ({ onClick }) => {
  return (
    <Tooltip title="Restaurar" placement="right" arrow>
      <IconButton sx={{ color: "black" }} onClick={onClick}>
        <RestoreIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ListRestoreButton;
