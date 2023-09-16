import { FC, useState } from "react";
import { Todo } from "../../types.ts";

interface TodoProps {
    id: Todo["id"];
    completed: Todo["completed"];
    title: Todo["title"];
}


export const Todo: FC<TodoProps> = ({title, completed, id}) => {

    return <>
        <div className="view">
            <input type="checkbox" className="toggle" checked={completed}/>
            <label htmlFor="">{title}</label>
            <button className="destroy"/>
        </div>
        <input type="text" className="edit"/>
    </>;
};
