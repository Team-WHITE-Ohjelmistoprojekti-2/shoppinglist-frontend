import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { editShoppinglist, getShoppinglistById } from "../../API/Apis";
import { Button, TextField } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

function EditList() {
  let navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
     isLoading,
     isError,
     data: shoppinglist,
     error
     } 
     = useQuery({
    queryKey: ["shoppinglists", id],
    queryFn: () => getShoppinglistById(id),
  });

  const [list, setList] = useState({
    name: "",
  });

  useEffect(() => {
    if (shoppinglist) {
      setList({ ...shoppinglist });
    }
  }, [shoppinglist]);

  const { mutate } = useMutation({
    mutationFn: editShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoppinglists"]);
      navigate(`/`);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(list);
    try {
      await mutate({ id, ...list });
    } catch (error) {
      console.error("Error editing list:", error);
    }
  };
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className="edit-form">
      <h2>Edit List</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <TextField.Root>
            <TextField.Slot>
            </TextField.Slot>
            <TextField.Input variant="soft"
              type="text"
              id="name"
              name="name"
              value={list.name}
              onChange={(e) => onInputChange(e)}
              required
            />
            </TextField.Root>
          </div>
          <Button type="submit" style={{marginRight: 20}}>Submit</Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
    </div>
  );
}

export default EditList;
