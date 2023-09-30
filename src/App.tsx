import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar.tsx";

export const App = () => {
    return <>
        <NavBar/>
        <Outlet/>
    </>;
};
