import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../App.tsx";
import { TicTacToePage } from "../pages/tictactoe-app/TicTacToePage.tsx";
import { TodoPage } from "../pages/todo-app/TodoPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/todo",
                element: <TodoPage/>
            },
            {
                path: "/tic-tac-toe",
                element: <TicTacToePage/>
            }
        ]
    }
]);

export const AppRouterProvider: FC<Record<string, never>> = () => <RouterProvider router={router}/>;
