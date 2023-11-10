import PropTypes from 'prop-types';

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
          <input
            type="text"
            id="name"
            placeholder="Product name"
            name="name"
            value={isEdit ? name : product.name}
            onChange={(e) => onInputChange(e)}
            required={!isEdit}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Quantity"
            name="quantity"
            value={isEdit ? quantity : product.quantity}
            onChange={(e) => onInputChange(e)}
            required={!isEdit}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            name="price"
            value={isEdit ? price : product.price}
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
            value={isEdit ? details : product.details}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit">
          {isEdit ? "Submit" : "Add Product"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
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
