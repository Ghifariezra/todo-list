const addHistory = async ({ activity_id, title, description, date }:
    { activity_id: number; title: string; description?: string; date?: string }) => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}history/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            activity_id,
            title,
            description,
            schedule: date,
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to add history: ${res.statusText}`);
    }

    return res.json();
};

const getHistory = async () => {
    const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}history-activity`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Failed to get history: ${res.statusText}`);
    }

    return res.json();
}

export { addHistory, getHistory };