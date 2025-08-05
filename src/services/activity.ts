import {
    supabase
} from "@/lib/supabase/main";
import type { Todo } from "@/types/todos";

const getTodos = async ({ user_id }: { user_id: number }) => {
    const { data, error } = await supabase.from("activity").select("*").eq("user_id", user_id);

    if (error) {
        throw new Error(error.message);
    }

    return data as Todo[];
}

const addTodo = async ({ user_id, title, description, date }: { user_id: number, title: string, description?: string, date?: string }) => {
    const { error } = await supabase
        .from('activity')
        .insert({
            title: title,
            description: description,
            schedule: date,
            user_id: user_id
        });

    if (error) {
        throw new Error(error.message);
    }

    return true;
}

const updateTodo = async (
    id: number,
    user_id: number,
    updates: { title?: string; description?: string; schedule?: string; is_completed?: boolean }
) => {
    const { error } = await supabase
        .from("activity")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user_id);

    if (error) throw new Error(error.message);
    return true;
};

const deleteTodos = async (selectedIds: number, user_id: number) => {
    const { error } = await supabase
        .from("activity")
        .delete()
        .eq("id", selectedIds)
        .eq("user_id", user_id);

    if (error) {
        throw new Error(error.message);
    }

    return true;
};

export {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodos
}