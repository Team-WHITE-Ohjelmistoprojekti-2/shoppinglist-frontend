import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addShoppinglist} from "../../API/Apis";


function AddList() {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const [list, setList] = useState({
    name: "",
  });
  const { name } = list;

  const { mutate } = useMutation( {
    mutationFn: addShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoppinglists"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });  

  const onInputChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate(`/`);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(list); // Verify the data in the console
    mutate(list); // Call the mutate function with the list data
    navigate(`/`);
  };

  return (
    <div className="edit-form">
      <h2>Add List</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="List name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            required
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
