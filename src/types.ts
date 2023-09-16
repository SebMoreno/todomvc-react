export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export const TODO_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const;

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS];
