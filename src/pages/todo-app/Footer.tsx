import { FilterValue, TODO_FILTERS } from '../../types.ts';
import { FC } from "react";
import { Filters } from "./Filters.tsx";

interface FooterProps {
    activeCount: number;
    completedCount: number;
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
    onClearCompleted: () => void;
}
export const Footer: FC<FooterProps> = ({
    activeCount,
    completedCount,
    filterSelected,
    onFilterChange,
    onClearCompleted
}) => {

    let count = "";
    switch (filterSelected) {
        case TODO_FILTERS.ALL:
            count = (activeCount + completedCount) + " tareas";
            break;

        case TODO_FILTERS.ACTIVE:
            count = activeCount + " tareas activas";
            break;

        case TODO_FILTERS.COMPLETED:
            count = completedCount + " tareas completadas";
            break;
    
        default:
            break;
    }

    return <footer className="footer">
        <span className="todo-count">{count}</span>
        <Filters filterSelected={filterSelected} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>Borrar completados</button>
    </footer>;
};
