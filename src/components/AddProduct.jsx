import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";
import ProductForm from "./ProductForm"; // Import the ProductForm component

function AddProduct() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    quantity: 1,
    price: "",
    details: "",
    shoppinglistId: id,
  });

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate(`/shoppinglist/${id}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, product);
      navigate(`/shoppinglist/${id}`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <ProductForm
      name={product.name}
      quantity={product.quantity}
      price={product.price}
      details={product.details}
      product={product}
      isEdit={false} 
      onSubmit={onSubmit}
      onInputChange={onInputChange}
      handleCancel={handleCancel}
    />
  );
}

export default AddProduct;
