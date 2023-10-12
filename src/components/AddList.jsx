import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { API_URL } from "../constants";
import { getCurrentTime } from "./DateHandler";

function AddList() {
  let navigate = useNavigate();
 

  const [list, setList] = useState({
    name: "",
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
  });

  const onInputChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  const onSubmit = async (e) => {
    console.log(list);
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/shoppinglists`, list);
      navigate(`/`);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <div className="add-form">
      <h2>Add List</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="List name"
            name="name"
            value={list.name}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdAt"></label>
          <input
            type="text"
            id="createdAt"
            name="createdAt"
            defaultValue={list.createdAt} // Käytä defaultValue-ominaisuutta
            hidden
          />
        </div>
        <div className="form-group">
          <label htmlFor="updatedAt"></label>
          <input
            type="text"
            id="updatedAt"
            name="updatedAt"
            defaultValue={list.updatedAt} // Käytä defaultValue-ominaisuutta
            hidden
          />
        </div>
        <button type="submit">Add List</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddList;
