import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addShoppinglist } from "../../API/Apis";
import { Button, TextField } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import PropTypes from "prop-types";
import useAuthEffect from "../UseAuthEffect";
import "@radix-ui/themes/styles.css";

function AddList({ isAuthenticated }) {
  let navigate = useNavigate();
  useAuthEffect(isAuthenticated);

  const queryClient = useQueryClient();

  const [list, setList] = useState({
    name: "",
  });
  const { name } = list;

  const { mutate } = useMutation({
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
          <TextField.Root>
            <TextField.Slot></TextField.Slot>
            <TextField.Input
              variant="soft"
              type="text"
              id="name"
              placeholder="List name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </TextField.Root>
        </div>
        <Button type="submit" style={{ marginRight: 20 }}>
          Add List
        </Button>
        <Button type="button" onClick={handleCancel} color="red">
          Cancel
        </Button>
      </form>
    </div>
  );
}
AddList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default AddList;
