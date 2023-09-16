import React from "react";
import { FilterValue } from "../../types.ts";

interface FiltersProps {
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<FiltersProps> = ({filterSelected, onFilterChange}) =>
    <ul className="filters">
        <li><a href="/">Todas</a></li>
        <li><a className="selected" href="/">Activas</a></li>
        <li><a href="/">Completadas</a></li>
    </ul>;
