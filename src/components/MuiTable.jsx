import PropTypes from "prop-types";
import { IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import CheckboxComponent from "./CheckboxComponent"; // Import CheckboxComponent
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from '@mui/material';
import '../App.css';


const MuiTable = (props) => {
  const { productData, deleteProduct, backgroundColor } = props;

  return (
    <TableContainer component={Paper}>
      <Table 
        style={{
          fontFamily: "Arial",
          borderCollapse: "collapse",
          width: "100%",

        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Shoppinglist Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product.id} style={{ backgroundColor }}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.quantity === 0 ? "1" : product.quantity}
              </TableCell>
              <TableCell>
                {product.price == null ? "" : product.price + "€"}
              </TableCell>
              <TableCell>{product.details}</TableCell>
              <TableCell>{product.shoppinglistName}</TableCell>
              <TableCell>
                {/* Render CheckboxComponent and TrashIcon in the same TableCell */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CheckboxComponent
                    id = {product.id}
                    label={product.name} /* otherProps={product.otherProps} */
                  />
                  <Tooltip title="Delete">
                  <IconButton
                    ml="1"
                    color="red"
                    size="3"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <TrashIcon width="24" height="24" />
                  </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MuiTable.propTypes = {
  productData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number,
      price: PropTypes.number,
      details: PropTypes.string,
      shoppinglistName: PropTypes.string,
    })
  ).isRequired,
  deleteProduct: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
};

export default MuiTable;
