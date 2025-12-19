import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemsList from "./pages/ItemsList";
import ItemForm from "./pages/ItemForm";

export default function App() {
  return (
    <div className="shell">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/new" element={<ItemForm mode="create" />} />
          <Route path="/edit/:id" element={<ItemForm mode="edit" />} />
          <Route path="*" element={<div className="container">404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
