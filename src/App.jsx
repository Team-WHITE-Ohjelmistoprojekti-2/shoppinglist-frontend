import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/edit/:id" element={<EditProduct />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
