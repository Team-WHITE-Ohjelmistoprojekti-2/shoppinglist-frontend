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
    <div className="add-form">
    <h2>Add Product</h2>
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Product name"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          id="quantity"
          placeholder="Quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="details">Details</label>
        <input
          type="text"
          id="details"
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
