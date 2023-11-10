import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { editProduct, getProductById } from "../API/Apis";
import ProductForm from "./ProductForm"; 

function EditProduct() {
  let navigate = useNavigate();
  const { id} = useParams();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: dataProduct,
    error
    } 
    = useQuery({
   queryKey: ["products", id],
   queryFn: () => getProductById(id),
 });
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    details: "",
    shoppinglistId: id,
  });

  useEffect(() => {
    if (dataProduct) {
      setProduct({ ...dataProduct });
    }
  }, [dataProduct]);
  const { mutate } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate(`/shoppinglist/${product.shoppinglistId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    navigate(`/shoppinglist/${product.shoppinglistId}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate({id, ...product})
      navigate(`/shoppinglist/${product.shoppinglistId}`);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <ProductForm
    name={product.name}
    quantity={product.quantity}
    price={product.price}
    details={product.details}
    product={product}
    isEdit={true}
    onSubmit={onSubmit}
    onInputChange={onInputChange}
    handleCancel={handleCancel}
  />
  );
}

export default EditProduct;
