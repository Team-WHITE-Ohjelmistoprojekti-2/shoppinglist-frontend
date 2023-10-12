import {} from "@radix-ui/react-portal"; // Radix-UI items here
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import PropTypes from "prop-types";
import RangeInput from "./RangeInput"; // Import the RangeInput component
import "./RangeInput.css"; // Import the CSS file for RangeInput
import { formatDateTime } from "./DateHandler";
import { Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';


function ViewShoppinglists() {
  const [shoppinglists, setShoppinglists] = useState([]);

  useEffect(() => {
    loadShoppinglists();
  }, []);

  const loadShoppinglists = async () => {
    try {
      const result = await axios.get(`${API_URL}/shoppinglists`);
      setShoppinglists(result.data);
    } catch (error) {
      console.error("Error loading shoppinglists:", error);
    }
  };

  const shoppinglistItems = shoppinglists.map((shoppinglist) => (
    <div key={shoppinglist.id} className="shoppinglist-item">
      <h1>{shoppinglist.name}</h1>
      <p>{shoppinglist.details}</p>
      <p>Created: {formatDateTime(shoppinglist.createdAt)}</p> 
     {/* <p>Updated: {formatDateTime(shoppinglist.updatedAt)}</p>   */}

      <Link className="button" to={`/shoppinglist/${shoppinglist.id}`}>View Shoppinglist</Link>
    </div>
  ));

  return (
    //Inside here you can put some cool stuffs later on 
    <Theme>
    <div className="view-shoppinglists">
      <RangeInput></RangeInput>
      <Link className="button" to={`/productlist`}>View productlist</Link>
      <h1>All Shoppinglists</h1>
      <Link className="button" to={`/addshoppinglist`}>Add a new Shoppinglist</Link>
      <div className="shoppinglist-container">{shoppinglistItems}</div>
    </div>
    </Theme>
  );
}

export default ViewShoppinglists;
