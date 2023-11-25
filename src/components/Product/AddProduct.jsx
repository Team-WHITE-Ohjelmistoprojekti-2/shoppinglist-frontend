import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductForm from "./ProductForm"; // Import the ProductForm component
import { addProduct } from "../../API/Apis";
import useAuthEffect from "../UseAuthEffect";
import PropTypes from "prop-types";

function AddProduct({ isAuthenticated }) {
  let navigate = useNavigate();
  useAuthEffect(isAuthenticated);

  const { id } = useParams();
  const queryClient = useQueryClient();

  const [product, setProduct] = useState({
    name: "",
    quantity: 1,
    price: "",
    details: "",
    shoppinglistId: id,
  });
  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      console.error(err);
    },
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
      await mutate(product);
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
AddProduct.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default AddProduct;
