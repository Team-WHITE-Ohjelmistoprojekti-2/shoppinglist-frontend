import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";
import ProductForm from "./ProductForm"; 

function EditProduct() {
  let navigate = useNavigate();
  const { id} = useParams();
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
      navigate(`/shoppinglist/${product.shoppinglistId}`);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
  const handleCancel = () => {
    navigate(`/shoppinglist/${product.shoppinglistId}`);
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
    <ProductForm
    name={name}
    quantity={quantity}
    price={price}
    details={details}
    product={product}
    isEdit={true}
    onSubmit={onSubmit}
    onInputChange={onInputChange}
    handleCancel={handleCancel}
  />
  );
}

export default EditProduct;
