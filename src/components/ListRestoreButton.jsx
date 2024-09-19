import React from "react";
import { IconButton } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

const ListRestoreButton = ({ onClick }) => {
  return (
    <IconButton sx={{ color: "black" }} onClick={onClick}>
      <RestoreIcon />
    </IconButton>
  );
};

export default ListRestoreButton;
