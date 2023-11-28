import {} from "@radix-ui/react-portal"; // Radix-UI items here
//import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link /*useNavigate*/ } from "react-router-dom";
import {
  Theme,
  IconButton,
  Flex,
  Button,
  Text,
  Card,
  ScrollArea,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";
import { deleteShoppinglist, getShoppinglists } from "../../API/Apis";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { Fragment } from "react";
dayjs.extend(utc);

function ViewShoppinglists({ isAuthenticated, handleLogout }) {
  //const navigate = useNavigate();
  const queryClient = useQueryClient();

  /*useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);*/

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
      queryClient.invalidateQueries({ queryKey: ["shoppinglists"] });
    },
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
          title: "Deleted!",
          text: "Shoppinglist has been deleted",
          icon: "success",
        });
        deleteShoppinglistMutation.mutate(id);
      }
    });
  };

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  const shoppinglistItems = shoppinglists.map((shoppinglist) => (
    <Card m="2" key={shoppinglist.id} size="4">
      <h1>
        {shoppinglist.name}{" "}
        <Link to={`/update/${shoppinglist.id}`}>
          <IconButton>
            <Pencil1Icon width={35} height={35}></Pencil1Icon>
          </IconButton>
        </Link>
      </h1>
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

      <Link to={`/shoppinglist/${shoppinglist.id}`}>
        <Button size="3" color="cyan" style={{ color: "black" }}>
          View Shoppinglist
        </Button>
      </Link>

      {isAuthenticated && (
        <IconButton
          ml="1"
          color="red"
          size="3"
          onClick={() => handleDelete(shoppinglist.id)}
        >
          <TrashIcon width="24" height="24" />
        </IconButton>
      )}
    </Card>
  ));

  return (
    //Inside here you can put some cool stuffs later on
    <Theme>
      <div className="view-shoppinglists">
        {isAuthenticated ? (
          <Fragment>
            <Flex direction="column" justify="center">
              <Text align="center" mb="4" size="5" weight="bold">
                You are logged in
              </Text>
            </Flex>
            <Flex justify="center" mb={"5"}>
              <Button color="red" onClick={() => handleLogout()}>
                Log out
              </Button>
            </Flex>
          </Fragment>
        ) : (
          <Flex justify="center" direction="row" gap="2" m={"5"}>
            <Link to={`/signup`}>
              <Button color="crimson">Create Account</Button>
            </Link>
            <Link to={`/login`}>
              <Button color="crimson">Login</Button>
            </Link>
          </Flex>
        )}

        <Link className="button" to={`/productlist`}>
          View productlist
        </Link>
        <h1>All Shoppinglists</h1>

        <Link className="button" to={`/addshoppinglist`}>
          Add a new Shoppinglist
        </Link>

        <ScrollArea
          mt="5"
          type="always"
          scrollbars="vertical"
          style={{ height: 600 }}
        >
          {shoppinglistItems}
        </ScrollArea>
      </div>
    </Theme>
  );
}

ViewShoppinglists.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
};

export default ViewShoppinglists;
