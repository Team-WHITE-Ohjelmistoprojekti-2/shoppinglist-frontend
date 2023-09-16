import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
