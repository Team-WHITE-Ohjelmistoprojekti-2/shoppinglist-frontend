import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import ViewShoppinglists from "./components/ViewShoppinglists";
import ShoppingList from "./components/ShoppingList";
import AddList from "./components/AddList";
import SignUp from "./components/SignUp";
import SignUpConfirm from "./components/SignUpConfirm";
import Login from "./components/Login";
import EditList from "./components/EditList";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div>
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
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup/confirm" element={<SignUpConfirm />} />
        </Routes>
      </Router>
    </div>
    <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
