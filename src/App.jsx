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

const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Remove JWT from session storage.
  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("jwt")
  }

  // Check for jwt token when opening app.
  // Does not actually validate it.
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
        <Router>
          <Routes>
            <Route exact path="/productlist" element={<ProductList isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/edit/:id" element={<EditProduct isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/addproduct/:id" element={<AddProduct isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/" element={<ViewShoppinglists isAuthenticated={isAuthenticated} handleLogout={handleLogout} />} />
            <Route exact path="/shoppinglist/:id" element={<ShoppingList isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/addshoppinglist/" element={<AddList isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/update/:id" element={<EditList  isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route exact path="/signup/confirm" element={<SignUpConfirm />} />
          </Routes>
        </Router>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
