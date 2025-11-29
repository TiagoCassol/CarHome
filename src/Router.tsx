import { Route, Routes } from "react-router";
import App from "./App";
import ListCardCarros from "./components/ListCardCarros";
import FormCarros from "./components/FormCarros";
import Home from "./components/Home";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App></App>} >
                <Route index element={<Home></Home>} />
                <Route path="/lista" element={<ListCardCarros></ListCardCarros>} />
                <Route path="/cadastro" element={<FormCarros></FormCarros>} />
            </Route>
        </Routes>
    )
}