import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";

function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    loadProducts();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}/${id}`, product);
    navigate("/");
  };

  const loadProducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  console.log(product);
  return (
    <div>
      <h2>Editproduct</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProduct;
