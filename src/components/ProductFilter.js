import React from "react";
import { TextField, Box, Button, MenuItem } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";

const ProductFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  isListView,
  setIsListView,
  toggleView,
}) => {
  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          style={{ width: "180px" }}
          select
          label="Filter by category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant={isListView ? "contained" : "outlined"}
          onClick={() => setIsListView(true)}
          sx={{ mr: 1 }}
        >
          <ListIcon />
        </Button>
        <Button
          variant={!isListView ? "contained" : "outlined"}
          onClick={() => setIsListView(false)}
        >
          <GridViewIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ProductFilter;
