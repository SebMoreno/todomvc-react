import { FC, useState } from 'react';
import { Todo } from "../../types.ts";

interface CreateTodoProps {
    onCreate: (title: Todo["title"]) => void;
}

export const CreateTodo: FC<CreateTodoProps> = ({onCreate}) => {
    const [value, setValue] = useState('');
    return <input
        className="new-todo"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
            if (e.key === 'Enter' && value !== '') {
                onCreate(value);
                setValue('');
            }
        }}
        placeholder="¿Qué quieres hacer?"
        autoFocus
    />;
};
