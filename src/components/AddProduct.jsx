import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_URL } from "../constants";

function AddProduct() {
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    details: "",
  });
  const { name, quantity, price, details } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(PRODUCTS_URL , product);
    navigate("/");
  };

  return (
    <div>
      <h2>Addproduct</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type={"text"}
            placeholder="Product name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type={"text"}
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type={"text"}
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <label>Details</label>
          <input
            type={"text"}
            placeholder="Details"
            name="details"
            value={details}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
