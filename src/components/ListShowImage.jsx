import React, { useState } from "react";
import { Modal, Box, IconButton, Tooltip } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";
import useNoImage from "../utils/useNoImage";

const ListShowImage = ({ imageURL }) => {
  const noImageURL = useNoImage();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isNoImage = imageURL === noImageURL;

  return (
    <>
      <Tooltip title={isNoImage ? "Sin Imagen" : "Ver Imagen"}>
        <span>
          <IconButton
            onClick={handleOpen}
            sx={{ color: "#283b54" }}
            disabled={isNoImage} // Deshabilitar si no hay imagen
          >
            {isNoImage ? <HideImageIcon /> : <ImageIcon />}
          </IconButton>
        </span>
      </Tooltip>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            outline: "none",
          }}
        >
          <img
            src={imageURL}
            alt="Producto"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ListShowImage;
