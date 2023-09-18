import React from "react";
import { FilterValue } from "../../types.ts";

interface FiltersProps {
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<FiltersProps> = ({filterSelected, onFilterChange}) =>
    <ul className="filters">
        <li><a className={filterSelected == 'all' ? 'selected' : ''} href="/"
         onClick={(event) => {event.preventDefault(); onFilterChange('all')}}>Todas</a></li>
        <li><a className={filterSelected == 'active' ? 'selected' : ''} href="/"
         onClick={(event) => {event.preventDefault(); onFilterChange('active')}}>Activas</a></li>
        <li><a className={filterSelected == 'completed' ? 'selected' : ''} href="/"
         onClick={(event) => {event.preventDefault(); onFilterChange('completed')}}>Completadas</a></li>
    </ul>;
