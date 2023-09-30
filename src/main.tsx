import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouterProvider } from "./contexts/AppRouterProvider.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <AppRouterProvider/>
        </UserProvider>
    </React.StrictMode>
);
