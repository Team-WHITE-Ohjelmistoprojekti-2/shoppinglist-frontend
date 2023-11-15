import {} from "@radix-ui/react-portal"; // Radix-UI items here
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Theme, IconButton, Flex, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";
import { deleteShoppinglist, getShoppinglists } from "../../API/Apis";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
dayjs.extend(utc);

function ViewShoppinglists() {

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: shoppinglists,
    error,
  } = useQuery({
    queryKey: ["shoppinglists"],
    queryFn: getShoppinglists,
  });

  const deleteShoppinglistMutation = useMutation({
    mutationFn: deleteShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppinglists']});
    }
  });

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:"Deleted!",
          text: "Shoppinglist has been deleted",
          icon: "success",

        })
        deleteShoppinglistMutation.mutate(id);
      }
    });
  };

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  const shoppinglistItems = shoppinglists.map((shoppinglist) => (
    <div key={shoppinglist.id} className="shoppinglist-item">
      <h1>{shoppinglist.name}  <Link  to={`/update/${shoppinglist.id}`}>
          <IconButton>
            <Pencil1Icon width={35} height={35}>

            </Pencil1Icon>

          </IconButton>
        </Link></h1>
      <p>{shoppinglist.details}</p>
      <p>
        Created:{" "}
        {dayjs
          .utc(shoppinglist.createdAt)
          .locale("fi")
          //.utcOffset(2)
          .format("DD.MM.YYYY  HH:mm")}
      </p>
       <p>
        Updated:{" "}
        {dayjs
          .utc(shoppinglist.updatedAt)
          .locale("fi")
          //.utcOffset(0)
          .format("DD.MM.YYYY  HH:mm")}
      </p> 
      <Link className="button" to={`/shoppinglist/${shoppinglist.id}`}>
        View Shoppinglist
      </Link>
     
       <Link
        className="button"
        onClick={() => handleDelete(shoppinglist.id)}
        style={{backgroundColor: "red"}}
      >
         <IconButton variant="ghost">
        <TrashIcon></TrashIcon> 
      </IconButton>
      </Link>    
    </div>
  ));

  return (
    //Inside here you can put some cool stuffs later on
    <Theme>
      <div className="view-shoppinglists" style={{marginTop: 70}}>
        <Flex justify="center" direction="row" gap="2" m={"5"}>
          <Link to={`/signup`}>
            <Button color="crimson">
              Create Account
            </Button>
          </Link>
          <Link to={`/login`}>
            <Button color="crimson">
              Login
            </Button>
          </Link>
        </Flex>

        <Link className="button" to={`/productlist`}>
          View productlist
        </Link>
        <h1>All Shoppinglists</h1>

        <Link className="button" to={`/addshoppinglist`}>
          Add a new Shoppinglist
        </Link>

        <div className="shoppinglist-container" style={{ overflowY: 'scroll', height: '400px'}}>{shoppinglistItems}</div>
      </div>
    </Theme>
  );
}

export default ViewShoppinglists;