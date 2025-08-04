const addTodo = async ({ title, description, schedule }: { title: string, description?: string, schedule?: string }) => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}activity/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, description, schedule })
    });

    if (!res.ok) {
        throw new Error(`Failed to add todo: ${res.statusText}`);
    }

    return res.json();
}

const getTodos = async () => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}activity`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Failed to get todos: ${res.statusText}`);
    }

    return res.json();
}

const updateTodo = async (
    id: number,
    updates: { title?: string; description?: string; schedule?: string; is_completed?: boolean }
) => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}activity/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updates)
    });

    if (!res.ok) {
        throw new Error(`Failed to update todo: ${res.statusText}`);
    }

    return res.json();
};

const deleteTodos = async (selectedIds: number) => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}activity/delete/${selectedIds}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete todos: ${res.statusText}`);
    }

    return res.json();
};

export {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodos
}