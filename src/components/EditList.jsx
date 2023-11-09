import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { editShoppinglist, getShoppinglistById } from "../API/Apis";

function EditList() {
  const { id } = useParams();
  let navigate = useNavigate();
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
    mutate({ id, ...list });
  };
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className="edit-form">
      <h2>Edit List</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={list.name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
    </div>
  );
}

export default EditList;
