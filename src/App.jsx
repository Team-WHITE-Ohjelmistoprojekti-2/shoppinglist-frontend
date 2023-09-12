import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Details</th>
        </tr>
      </table>
      <ProductList />
    </div>
  );
}

export default App;
