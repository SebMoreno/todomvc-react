import React from "react";
import { FilterValue, TODO_FILTERS } from "../../types.ts";

interface FiltersProps {
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<FiltersProps> = ({filterSelected, onFilterChange}) =>
    <ul className="filters">
        {Object.values(TODO_FILTERS).map(filter =>
            <li key={filter}>
                <a href={`/?filter=${filter}`}
                   className={filter === filterSelected ? 'selected' : ''}
                   onClick={e => {
                       e.preventDefault();
                       onFilterChange(filter);
                   }}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </a>
            </li>
        )}
    </ul>;
