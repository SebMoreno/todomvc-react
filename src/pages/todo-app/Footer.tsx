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
    const plural = activeCount !== 1 ? 's' : '';
    return (
        <footer className="footer">
            <span className="todo-count">
                {`${activeCount} tarea${plural} pendiente${plural}`}
            </span>
            <Filters filterSelected={filterSelected} onFilterChange={onFilterChange}/>
            {completedCount > 0 && (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Borrar completados
                </button>
            )}
        </footer>
    );
};
