import {
    supabase
} from "@/lib/supabase/main";
import type { Todo } from "@/types/todos";

const getTodos = async () => {
    const { data, error } = await supabase.from("activity").select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data as Todo[];
}

const addTodo = async ({title, description, date} : {title: string, description?: string, date?: string}) => {
    const { error } = await supabase
        .from('activity')
        .insert({ 
            title: title,
            description: description,
            schedule: date
         });

    if (error) {
        throw new Error(error.message);
    }

    return true;
}

const updateTodo = async (
    id: number,
    updates: { title?: string; description?: string; schedule?: string; is_completed?: boolean }
) => {
    const { error } = await supabase
        .from("activity")
        .update(updates)
        .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
};


const deleteTodos = async (selectedIds: number) => {
    const { error } = await supabase
        .from("activity")
        .delete()
        .eq("id", selectedIds);

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