import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductList = ({ products, isListView, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEditClick = () => {
    onEdit(selectedProduct);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDelete(selectedProduct.id);
    handleMenuClose();
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {isListView ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuClick(event, product)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEditClick}>
                        <EditIcon sx={{ mr: 1 }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteClick}>
                        <DeleteIcon sx={{ mr: 1 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper
                sx={{ padding: 2, cursor: "pointer" }}
                onClick={() => handleProductClick(product)}
              >
                {product.imageURL && (
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <Typography variant="h6">
                  <small>Name:</small> {product.name}
                </Typography>
                <Typography variant="body2">
                  <small>Price:</small> ${product.price}
                </Typography>
                <Typography variant="body2">
                  <small>Category:</small> {product.category}
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></Box>
                <TableCell
                  style={{ display: "flex", justifyContent: "space-between" }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => onEdit(product)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon /> Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(product.id)}
                  >
                    <DeleteIcon /> Delete
                  </Button>
                </TableCell>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <ProductDetailsModal
        open={isModalOpen}
        handleClose={handleModalClose}
        product={selectedProduct}
      />
    </Box>
  );
};

export default ProductList;
