import { Route, Routes } from "react-router";
import App from "./App";
import ListCardLivros from "./components/ListCardLivros";
import FormLivros from "./components/FormLivros";
import Home from "./components/Home";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App></App>} >
                <Route index element={<Home></Home>} />
                <Route path="/lista" element={<ListCardLivros></ListCardLivros>} />
                <Route path="/cadastro" element={<FormLivros></FormLivros>} />
            </Route>
        </Routes>
    )
}