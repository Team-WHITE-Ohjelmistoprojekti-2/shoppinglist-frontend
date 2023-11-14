import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import{SignUp, SignUpConfirm} from "./components/SignUp";
import Login from "./components/Login";
import { ProductList, AddProduct, EditProduct} from "./components/Product";
import { ViewShoppinglists, ShoppingList, AddList, EditList } from "./components/ShoppingList";
import { useEffect, useState } from "react";
import { Text } from "@radix-ui/themes";

const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.setItem("jwt", "");
  }

  // Check for jwt token when opening app.
  // This is very poor way and is not good or secure.
  // TODO: Validate token in backend to make sure it is valid and not expired.
  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken != null) {
      setAuthenticated(true);
      console.log("authenticated");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      { isAuthenticated && <Text align="center" mb="4" size="5" weight="bold">You are logged in</Text> }
      <Router>
        <Routes>
          <Route exact path="/productlist" element={<ProductList />} />
          <Route exact path="/edit/:id" element={<EditProduct />} />
          <Route exact path="/addproduct/:id" element={<AddProduct />} />
          <Route exact path="/" element={<ViewShoppinglists />} />
          <Route exact path="/shoppinglist/:id" element={<ShoppingList />} />
          <Route exact path="/addshoppinglist/" element={<AddList />} />
          <Route exact path="/update/:id" element={<EditList />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route exact path="/signup/confirm" element={<SignUpConfirm />} />
        </Routes>
      </Router>
    </div>
    <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
