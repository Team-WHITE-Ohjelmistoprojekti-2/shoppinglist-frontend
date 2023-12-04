import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import './ConfirmButton.css';

const ConfirmButton = ({ checkedProducts, onConfirm }) => {
  const handleConfirm = async () => {
    try {
        // Show a confirmation message to the user?

      const confirmationMessage = checkedProducts.map((product) => product.name).join(', ');

      await Swal.fire({
        title: 'Confirm Selected Products',
        html: `You are about to confirm the following products:<br/><br/><b>${confirmationMessage}</b>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm!',
      });

      // If the user confirms, you can trigger additional actions or update the UI
      onConfirm();
    } catch (error) {
      console.error('Error confirming products:', error);
    }
  };

  return (
    <div className="button-wrapper">
      {checkedProducts.length > 0 && (
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm Selected Products
        </button>
      )}
    </div>
  );
};

ConfirmButton.propTypes = {
  checkedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmButton;
