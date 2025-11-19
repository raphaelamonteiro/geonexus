import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import CountriesPage from "./pages/CountriesPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fav" element={<FavoritesPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:country" element={<CountryDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
