import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";


function ProductList() {
  const [product, setProduct] = useState([]);

 

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // const result = await axios.get(PRODUCTS_URL);
    const result = await axios.get(`${API_URL}/products`);
    setProduct(result.data);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/product/${id}`);
    loadProducts();
  };

  const tableHeader = (
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Details</th>
        <th>
        <button className="addbutton">
    <Link to="/addproduct">Add Product</Link>
    </button>
    </th>
    <th></th>
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
    <div className="root-container">
    <table>
      {tableHeader}
      <tbody>{listItems}</tbody>
    </table>
  </div>
  );
}

export default ProductList;
