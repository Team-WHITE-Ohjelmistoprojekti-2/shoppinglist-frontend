import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL, Delete_URL } from "../constants";

function ProductList() {
  const [product, setProduct] = useState([]);

  // const { id } = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get(API_URL);
    setProduct(result.data);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${Delete_URL}/${id}`);
    loadProducts();
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
      <td>{product.price} €</td>
      <td>{product.details}</td>
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
      </td>
      <td>
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
