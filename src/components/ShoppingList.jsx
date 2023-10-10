import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../constants";

function ShoppingList() {
  const { id: shoppinglistId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadShoppinglist(shoppinglistId);
  }, [shoppinglistId]);

  const loadShoppinglist = async (shoppinglistId) => {
    try {
      const result = await axios.get(
        `${API_URL}/products?shoppinglist=${shoppinglistId}`
      );
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (productId) => {
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
        await axios.delete(`${API_URL}/product/${productId}`);
        loadShoppinglist(shoppinglistId);
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
          <Link className="button" to={`/addproduct/${shoppinglistId}`}>
            Add Product
          </Link>
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
        <Link className="button" to={`/edit/${product.id}`}>
          Edit
        </Link>
      </td> 
      <td>
        <button className="deletebutton" onClick={() => deleteProduct(product.id)}>Delete</button>
      </td>
    </tr>
  ));

  console.log(product);
  return (
    <div className="root-container">
      <table>
        {tableHeader}
        <tbody>{listItems}</tbody>
      </table>
      <Link className="button" to={`/`}>
        View shoppinglists
      </Link>
    </div>
  );
}

export default ShoppingList;
