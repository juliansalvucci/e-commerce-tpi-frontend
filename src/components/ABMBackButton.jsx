import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const BBTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "12px",
  },
}));

const BackButton = styled(Button)({
  boxShadow: "none",
  color: "#000000",
  padding: "6px 6px",
  margin: "20px 30px",
  border: "2px solid",
  borderRadius: "100px",
  backgroundColor: "#ffffff",
  borderColor: "#454545",
  "&:hover": {
    borderColor: "#000000",
  },
  "&:active": {
    borderColor: "#000000",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem #000000",
  },
});

const ABMBackButton = () => {
  return (
    <BBTooltip
      title="Volver"
      placement="bottom"
      arrow
      disableInteractive
      TransitionComponent={Zoom}
    >
      <BackButton
        variant="contained"
        size="large"
        endIcon={<ArrowBackIosIcon />}
      ></BackButton>
    </BBTooltip>
  );
};

export default ABMBackButton;
