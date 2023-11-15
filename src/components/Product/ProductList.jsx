import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../constants";
import "@radix-ui/themes/styles.css";
import RangeInput from "./../RangeInput";
import { Theme } from "@radix-ui/themes";
import MuiTable from "./../MuiTable";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import DropDownMenuComponent from "./../DropDownMenu";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("white"); 

  useEffect(() => {
    loadProducts();
  }, []);

  const fetchShoppinglistName = async (shoppinglistId) => {
    try {
      const response = await axios.get(
        `${API_URL}/shoppinglists/${shoppinglistId}`
      );
      return response.data.name;
    } catch (error) {
      console.error("Error fetching shopping list name:", error);
      return " ";
    }
  };

  const loadProducts = async () => {
    try {
      const productsResponse = await axios.get(`${API_URL}/products`);
      const products = productsResponse.data;

      // Fetch shopping list names for each product
      const productsWithShoppinglistName = await Promise.all(
        products.map(async (product) => {
          const shoppinglistName = await fetchShoppinglistName(
            product.shoppinglistId
          );
          return { ...product, shoppinglistName };
        })
      );

      setProduct(productsWithShoppinglistName);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure you want to delete this product?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        await axios.delete(`${API_URL}/product/${id}`);
        loadProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  //color slider
  const handleSliderChange = (newValue) => {
    const cyan = "rgba(125,214,226)"; // Cyan color
    const lightCyan = "rgba(20,160,160)"; // Light Cyan color
    const interpolatedColor = interpolateColor(
      cyan,
      lightCyan,
      newValue[0] / 100
    );
    setBackgroundColor(interpolatedColor);
  };

  // Interpolate between two rgba colors (yes works well but slider is bugged)
  function interpolateColor(color1, color2, ratio) {
    const c1 = color1.match(/\d+/g);
    const c2 = color2.match(/\d+/g);
    const result = c1.map((channel, index) =>
      Math.round(
        Number(channel) + (Number(c2[index]) - Number(channel)) * ratio
      )
    );
    return `rgba(${result.join(",")})`;
  }
  return (
    
    <Theme grayColor="sand" radius="large" scaling="95%">
      <div className="slider-container" style={{ overflowY: 'scroll', height: '400px' }}>
        <TableContainer component={Paper}>
          {/* Render the MuiTable component */}
          <MuiTable
            productData={product}
            deleteProduct={deleteProduct}
            backgroundColor={backgroundColor}
            
          />
        </TableContainer>

        <p>Table color slider beta 0.2</p>
        <RangeInput onValueChange={handleSliderChange} label="Background Opacity" />
      </div>
      <div className="root-container">
        <Link className="button" to={`/`}>
          View shoppinglists
        </Link>
      </div>
      <DropDownMenuComponent />
      <Link className="button" to={`/`}>
          Add Products to shoppinglist
        </Link>
    </Theme>
  );
}
export default ProductList;
