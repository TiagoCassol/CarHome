import { Route, Routes } from "react-router-dom";
import App from "./App";
import ListCardCarros from "./components/ListCardCarros";
import FormCarros from "./components/FormCarros";
import Home from "./components/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="lista" element={<ListCardCarros />} />
        <Route path="cadastro" element={<FormCarros />} />
      </Route>
    </Routes>
  );
}