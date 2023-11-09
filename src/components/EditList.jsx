import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { editShoppinglist, getShoppinglistById } from "../API/Apis";

function EditList() {
  const { id } = useParams();
  let navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: shoppinglist,
  } = useQuery({
    queryKey: ["shoppinglists", id],
    queryFn: () => getShoppinglistById(id),
  });

  const [list, setList] = useState({
    name: "",
  });

  const { name } = list;

  useEffect(() => {
    if (shoppinglist) {
      setList(shoppinglist);
    }
  }, [shoppinglist]);

  const { mutate } = useMutation({
    mutationFn: editShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoppinglist"]);
      navigate(`/`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onInputChange = (e) => {
    setList((prevList) => ({
      ...prevList,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(list); // Tarkista datan arvo konsolissa
    mutate({ id, updatedList: list }); // Kutsu mutate-funktiota listan datalla ja ID:llä
  };

  return (
    <div className="edit-form">
      <h2>Edit List</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default EditList;
