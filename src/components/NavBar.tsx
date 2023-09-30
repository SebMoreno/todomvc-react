import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../elements/Button.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import { users } from "../mocks/users.ts";
import "../styles/NavBar.css";

export const NavBar: FC<Record<string, never>> = () => {
    const { user, isLoggedIn, logIn, logOut } = useAuth();

    return <nav>
        <h2>{user ? `Hi ${user.username}` : "React Demo"}</h2>
        <NavLink
            to="/todo"
            className={({ isActive }) => isActive ? "hover" : ""}>
            <Button type="galaxy">Todos App</Button>
        </NavLink>
        <NavLink
            to="/tic-tac-toe"
            className={({ isActive }) => isActive ? "hover" : ""}>
            <Button type="galaxy">Tic-Tac-Toe Game</Button>
        </NavLink>
        <Button
            type="lifted"
            onClick={isLoggedIn ? logOut : () => logIn(users[0])}
            buttonNativeProps={{
                style: {
                    marginLeft: "1rem",
                    width: "fit-content"
                }
            }}>{isLoggedIn ? "LogOut" : "LogIn"}</Button>
    </nav>;
};
