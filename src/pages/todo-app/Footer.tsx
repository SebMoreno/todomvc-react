import { FilterValue } from '../../types.ts';
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
    
    let task_type: string;
    let num_after_filter: number;

    if (filterSelected == "active")
    {
        task_type = "Tareas pendientes";
        num_after_filter = activeCount;
    }
    else if (filterSelected == "completed")
    {
        task_type = "Tareas completadas";
        num_after_filter = completedCount;
    }
    else
    {
        task_type = "Tareas registradas";
        num_after_filter = activeCount + completedCount;
    }

    return  <footer className="footer">
        <span className="todo-count">{num_after_filter} {task_type}</span>
        <Filters filterSelected={filterSelected} onFilterChange={onFilterChange}/>
        <button className="clear-completed" onClick={onClearCompleted}> Borrar completados </button>
    </footer>;
};
