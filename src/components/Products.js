import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button, Box, Typography, Switch } from "@mui/material";
import Sidebar from "./Sidebar";
import AddIcon from "@mui/icons-material/Add";
import ProductList from "./ProductList";
import ProductFilter from "./ProductFilter";
import ProductsModal from "./ProductsModal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isListView, setIsListView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        setFilteredProducts(response.data);

        const categorySet = new Set(
          response.data.map((product) => product.category)
        );
        setCategories([...categorySet]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const toggleView = () => setIsListView((prevView) => !prevView);

  const handleProductAdded = (product) => {
    if (currentProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
      );
      setFilteredProducts((prevFiltered) =>
        prevFiltered.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prevProducts) => [...prevProducts, product]);
      setFilteredProducts((prevFiltered) => [...prevFiltered, product]);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          paddingTop: "20px",
          marginLeft: "20%",
          width: "80%",
          padding: "20px",
          color: "#000",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Products</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleAddProduct}
              variant="contained"
              sx={{ ml: 2 }}
            >
              <AddIcon /> Add Product
            </Button>
          </Box>
        </Box>
        <ProductFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          isListView={isListView}
          setIsListView={setIsListView}
          toggleView={toggleView}
        />
        {products.length != 0 ? (
          <ProductList
            products={filteredProducts}
            isListView={isListView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <h3
            style={{
              width: "30vh",
              height: "100vh",
              display: "flex",
              textAlign: "center",
              margin: "0 auto",
              alignItems: "center",
            }}
          >
            Maxsulot mavjud emas! Iltimos maxsulot kiriting!
          </h3>
        )}

        <ProductsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          currentProduct={currentProduct}
          onProductAdded={handleProductAdded}
        />
      </Box>
    </Box>
  );
};

export default Products;
