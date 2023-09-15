import { useState, useEffect } from "react";
import { API_URL } from "../constants";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const listItems = products.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
          <td>{product.details}</td>
        </tr>
  ));

  console.log(products);
  return (
    <table>
      {tableHeader}
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default ProductList;
