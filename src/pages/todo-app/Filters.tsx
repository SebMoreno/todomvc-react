import React from "react";
import { FilterValue, TODO_FILTERS } from "../../types.ts";

interface FiltersProps {
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<FiltersProps> = ({filterSelected, onFilterChange}) =>
    <ul className="filters">
        <li>
            <a 
            className={filterSelected == TODO_FILTERS.ALL? "selected":""} 
            onClick={() => onFilterChange(TODO_FILTERS.ALL)}>
                Todas
            </a>
        </li>
        <li>
            <a 
            className={filterSelected == TODO_FILTERS.ACTIVE? "selected":""} 
            onClick={() => onFilterChange(TODO_FILTERS.ACTIVE)}>
                Activas
            </a>
        </li>
        <li>
            <a 
            className={filterSelected == TODO_FILTERS.COMPLETED? "selected":""} 
            onClick={() => onFilterChange(TODO_FILTERS.COMPLETED)}>
                Completadas
            </a>
        </li>
    </ul>;
