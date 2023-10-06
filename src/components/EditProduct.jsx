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
    shoppinglistId: id,
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
    try {
      await axios.put(`${API_URL}/products/${id}`, product);
      navigate(`/`);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
  const handleCancel = () => {
    navigate(`/`);
  };

  const loadProducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/products/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  console.log(id);
  console.log(product);

  return (
    <div className="edit-form">
      <h2>Edit Product</h2>
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
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
