export interface Todo {
    id: number;
    title: string;
    description?: string | null;
    schedule?: string | null;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface CardActivityProps {
    todos: Todo[];
}