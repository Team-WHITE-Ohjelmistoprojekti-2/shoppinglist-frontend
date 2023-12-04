import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../../constants";
import PropTypes from 'prop-types';
import { ConfirmButton } from '../DropDownMenu';

const DropdownMenu = ({ onSelectShoppinglist }) => {
  const [shoppinglists, setShoppinglists] = useState([]);
  const [selectedShoppinglist, setSelectedShoppinglist] = useState(null);

  useEffect(() => {
    const fetchShoppinglists = async () => {
      try {
        const response = await axios.get(`${API_URL}/shoppinglists`);
        setShoppinglists(response.data);
      } catch (error) {
        console.error('Error fetching shoppinglists:', error);
      }
    };

    fetchShoppinglists();
  }, []);

  const handleShoppinglistChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selected = shoppinglists.find((list) => list.id === selectedId);
    setSelectedShoppinglist(selected);
    onSelectShoppinglist(selected);
  };

  console.log('Rendered DropdownMenu. Shoppinglists:', shoppinglists);
  console.log('Selected Shoppinglist:', selectedShoppinglist);

  return (
    <div>
      <label htmlFor="shoppinglist">Select a Shoppinglist:</label>
      <select
        id="shoppinglist"
        onChange={handleShoppinglistChange}
        value={selectedShoppinglist ? selectedShoppinglist.id : ''}
      >
        <option value="" disabled>
          Choose a shoppinglist
        </option>
        {shoppinglists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
      {selectedShoppinglist && (
        <>
          <p>Selected Shoppinglist: {selectedShoppinglist.name}</p>
          <ConfirmButton checkedProducts={[selectedShoppinglist]} onConfirm={() => console.log('Confirmed')} />
        </>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  onSelectShoppinglist: PropTypes.func.isRequired,
};

export default DropdownMenu;
