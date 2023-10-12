import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../constants";
import PropTypes from "prop-types";
//radix styles import
import '@radix-ui/themes/styles.css';
//radix example
import { Theme, Button } from '@radix-ui/themes';


function ProductList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  //dropdown menu radix example
  const DropdownMenuDemo = () => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");
  };

  const loadProducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/products`);
      setProduct(result.data);
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

  const tableHeader = (
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Details</th>
        <th>
    {/*
          <button className="addbutton">
            <Link to="/addproduct">Add Product</Link>
          </button>*/}
        </th>
        <th></th>
      </tr>
    </thead>
  );

  const listItems = product.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.quantity == 0 ? "1" : product.quantity}</td>
      <td>{product.price == null ? "" : product.price + "€"}</td>
      <td>{product.details}</td>
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
      </td>
      <td>
        <Button color="crimson" variant="classic" onClick={() => deleteProduct(product.id)}>Delete</Button>
      </td>
    </tr>
  ));

  console.log(product);
  return (
    <Theme grayColor="sand" radius="large" scaling="95%">
    <div className="root-container">
        <Link className="button" to={`/`}>View shoppinglists</Link>
      <table>
        {tableHeader}
        <tbody>{listItems}</tbody>
      </table>
    </div>
    </Theme>
  );
}

export default ProductList;
