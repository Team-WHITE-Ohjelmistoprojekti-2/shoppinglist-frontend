import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../constants";
import { IconButton, Table, Heading, Theme } from "@radix-ui/themes";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import useAuthEffect from "../UseAuthEffect";
import PropTypes from "prop-types";
import CheckboxComponent from "../CheckboxComponent";

function ShoppingList({ isAuthenticated }) {
  useAuthEffect(isAuthenticated);
  const { id: shoppinglistId } = useParams();
  const [product, setProduct] = useState([]);
  const [shoppinglistName, setShoppinglistName] = useState("");

  useEffect(() => {
    loadShoppinglist(shoppinglistId);
  }, [shoppinglistId]);

  const loadShoppinglist = async (shoppinglistId) => {
    try {
      const result = await axios.get(
        `${API_URL}/products?shoppinglist=${shoppinglistId}`
      );
      const resultname = await axios.get(
        `${API_URL}/shoppinglists/${shoppinglistId}`
      );
      setProduct(result.data);
      setShoppinglistName(resultname.data.name);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure you want to delete this product?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        await axios.delete(`${API_URL}/product/${productId}`);
        loadShoppinglist(shoppinglistId);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const tableHeader = (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Details</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Bought</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const listItems = product.map((product) => (
    <Table.Row key={product.id} align="center">
      <Table.Cell>{product.name}</Table.Cell>
      <Table.Cell>{product.quantity == 0 ? "1" : product.quantity}</Table.Cell>
      <Table.Cell>
        {product.price == null ? "" : product.price + "€"}
      </Table.Cell>
      <Table.Cell>{product.details}</Table.Cell>
      <Table.Cell>
        <Link to={`/edit/${product.id}`}>
          <IconButton variant="classic" size="3">
            <Pencil1Icon width="24" height="24"></Pencil1Icon>
          </IconButton>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <IconButton
          ml="1"
          color="red"
          size="3"
          onClick={() => deleteProduct(product.id)}
        >
          <TrashIcon width="24" height="24" />
        </IconButton>
      </Table.Cell>
      <Table.Cell>
        <CheckboxComponent
        id = {product.id}
                    label={product.name} /* otherProps={product.otherProps} */
                  />
      </Table.Cell>
    </Table.Row>
  ));

  console.log(product);
  return (
    <Theme>
      <Heading size="7">{shoppinglistName}</Heading>
      <Table.Root m="2" sx={{ overflowX: 'auto' }}>
        {tableHeader}
        <Table.Body>{listItems}</Table.Body>
      </Table.Root>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Link className="button" to={`/`}>
          View shoppinglists
        </Link>
        <Link
          className="button"
          style={{ marginLeft: 20 }}
          to={`/addproduct/${shoppinglistId}`}
        >
          Add Product
        </Link>
      </div>
    </Theme>
  );
}


ShoppingList.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default ShoppingList;
