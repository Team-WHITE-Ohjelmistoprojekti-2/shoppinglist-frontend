import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";

function ProductList() {
  const [product, setProduct] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get(API_URL);
    setProduct(result.data);
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(API_URL + id);
      loadProducts();
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
      </tr>
    </thead>
  );

  const listItems = product.map((product) => (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.details}</td>
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
      </td>
    </tr>
  ));

  console.log(product);
  return (
    <table>
      {tableHeader}
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default ProductList;
