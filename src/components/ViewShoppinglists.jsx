import {} from "@radix-ui/react-portal"; // Radix-UI items here
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";

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
      <Link to={`/shoppinglist/${shoppinglist.id}`}>View Shoppinglist</Link>
    </div>
  ));

  return (
    <div className="view-shoppinglists">
      <button>
        <Link to={`/`}>View productlist</Link>
      </button>
      <h1>All Shoppinglists</h1>
      <div className="shoppinglist-container">{shoppinglistItems}</div>
    </div>
  );
}

export default ViewShoppinglists;
