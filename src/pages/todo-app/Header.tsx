import { FC } from "react";
import { CreateTodo } from "./CreateTodo.tsx";
import { Todo } from "../../types.ts";

interface HeaderProps {
    title: string;
    onCreateTodo: (title: Todo["title"]) => void;
}

export const Header: FC<HeaderProps> = ({title, onCreateTodo}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <CreateTodo onCreate={onCreateTodo}/>
        </header>
    );
};
