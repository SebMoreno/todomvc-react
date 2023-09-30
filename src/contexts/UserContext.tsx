import { createContext, FC, ReactNode, useState } from "react";
import { User } from "../types.ts";

interface UserContextValue {
    isLoggedIn: boolean;
    user: User | null;
    logIn: (user: User) => void;
    logOut: () => void;
    setUsername: (username: User["username"]) => void;
    setEmail: (email: User["email"]) => void;
}


export const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                logIn: user => {
                    setUser(user);
                    setIsLoggedIn(true);
                },
                logOut: () => {
                    setUser(null);
                    setIsLoggedIn(false);
                },
                user,
                setUsername: username => {
                    if (isLoggedIn && user) {
                        setUser({ ...user, username });
                    }
                },
                setEmail: email => {
                    if (isLoggedIn && user) {
                        setUser({ ...user, email });
                    }
                }
            }}>
            {children}
        </UserContext.Provider>
    );
};
