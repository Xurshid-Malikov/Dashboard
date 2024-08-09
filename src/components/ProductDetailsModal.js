import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailsModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
          borderRadius: "8px",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {product.imageURL && (
          <img
            src={product.imageURL}
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          />
        )}
        <Typography variant="h6" gutterBottom>
          <small>Name:</small> {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <small>Price:</small> ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <small>Category:</small> {product.category}
        </Typography>
        <Typography variant="body2">
          <small>Description:</small> {product.description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProductDetailsModal;
