import PropTypes from 'prop-types';
import { Button, TextField } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

const ProductForm = ({
  name,
  quantity,
  price,
  details,
  product,
  isEdit,
  onSubmit,
  onInputChange,
  handleCancel,
}) => {
  return (
    <div className={isEdit ? "edit-form" : "add-form"}>
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <TextField.Root>
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input variant="soft"
              placeholder="Product name"
              name="name"
              value={isEdit ? name : product.name}
              onChange={(e) => onInputChange(e)}
              required={!isEdit}
            />
          </TextField.Root>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <TextField.Root>
           
            <TextField.Input variant="soft"
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={isEdit ? quantity : product.quantity}
              onChange={(e) => onInputChange(e)}
              required={!isEdit}
            />
          </TextField.Root>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <TextField.Root>
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input variant="soft"
              type="text"
              placeholder="Price"
              name="price"
              value={isEdit ? price : product.price}
              onChange={(e) => onInputChange(e)}
            />
          </TextField.Root>
        </div>
        <div className="form-group">
          <label htmlFor="details">Details</label>
          <TextField.Root>
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input variant="soft"
              type="text"
              placeholder="Details"
              name="details"
              value={isEdit ? details : product.details}
              onChange={(e) => onInputChange(e)}
            />
          </TextField.Root>
        </div>
        <Button type="submit" style={{marginRight: 20}}>
          {isEdit ? "Submit" : "Add Product"}
        </Button>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.string,
  details: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    details: PropTypes.string,
  }),
  isEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ProductForm;
