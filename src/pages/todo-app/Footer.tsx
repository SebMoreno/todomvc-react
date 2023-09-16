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
    return  <footer className="footer">
        <span className="todo-count">4 tareas pendientes</span>
        <Filters filterSelected={filterSelected} onFilterChange={onFilterChange}/>
        <button className="clear-completed">Borrar completados</button>
    </footer>;
};
