import { useState, useEffect } from "react";
import { API_URL } from "../constants";

function ProductList() {
  const [products, setProducts] = useState([]);

  /*   const [columnDefs] = useState([
    { field: "name" },
    { field: "quantity" },
    { field: "price" },
    { field: "details" },
  ]); */

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.items))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const listItems = products.map((product) => (
    /*     <li key={product.id}>
      {product.name} <br></br> quantity: {product.quantity} <br></br> price:{" "}
      {product.price} <br></br> details: {product.details}
    </li> */
    <table key={product.id}>
      <tr>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td>{product.details}</td>
      </tr>
    </table>
  ));
  console.log(products);
  return <ul>{listItems}</ul>;
}

export default ProductList;
