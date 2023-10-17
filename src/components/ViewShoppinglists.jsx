import {} from "@radix-ui/react-portal"; // Radix-UI items here
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import PropTypes from "prop-types";
import RangeInput from "./RangeInput"; // Import the RangeInput component
import "./RangeInput.css"; // Import the CSS file for RangeInput
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";

dayjs.extend(utc);

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

  const deleteShoppinglist = async (shoppinglistId) => {
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
        await axios.delete(`${API_URL}/shoppinglists/${shoppinglistId}`);
        loadShoppinglists(shoppinglistId);
      }
    } catch (error) {
      console.error("Error deleting shoppinglist:", error);
    }
  };

  const shoppinglistItems = shoppinglists.map((shoppinglist) => (
    <div key={shoppinglist.id} className="shoppinglist-item">
      <h1>{shoppinglist.name}</h1>
      <p>{shoppinglist.details}</p>
      <p>
        Created:{" "}
        {dayjs
          .utc(shoppinglist.createdAt)
          .locale("fi")
          .utcOffset(3)
          .format("YYYY-MM-DD HH:mm")}
      </p>

      {/* <p>Updated: {formatDateTime(shoppinglist.updatedAt)}</p>   */}

      <Link className="button" to={`/shoppinglist/${shoppinglist.id}`}>
        View Shoppinglist
      </Link>
      <button
        className="button"
        onClick={() => deleteShoppinglist(shoppinglist.id)}
      >
        Delete shoppinglist
      </button>
    </div>
  ));

  return (
    //Inside here you can put some cool stuffs later on
    <Theme>
      <div className="view-shoppinglists">
        <RangeInput></RangeInput>
        <Link className="button" to={`/productlist`}>
          View productlist
        </Link>
        <h1>All Shoppinglists</h1>

        <Link className="button" to={`/addshoppinglist`}>
          Add a new Shoppinglist
        </Link>

        <div className="shoppinglist-container">{shoppinglistItems}</div>
      </div>
    </Theme>
  );
}

export default ViewShoppinglists;
