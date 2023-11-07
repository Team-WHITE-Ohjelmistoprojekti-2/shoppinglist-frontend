import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import ViewShoppinglists from "./components/ViewShoppinglists";
import ShoppingList from "./components/ShoppingList";
import AddList from "./components/AddList";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/productlist" element={<ProductList />} />
          <Route exact path="/edit/:id" element={<EditProduct />} />
          <Route exact path="/addproduct/:id" element={<AddProduct />} />
          <Route exact path="/" element={<ViewShoppinglists />} />
          <Route exact path="/shoppinglist/:id" element={<ShoppingList />} />
          <Route exact path="/addshoppinglist/" element={<AddList />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
