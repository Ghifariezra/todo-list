import {
    supabase
} from "@/lib/supabase/main";
import type { Todo } from "@/types/todos";

const getHistory = async ({ user_id }: { user_id: number }) => {
    const { data, error } = await supabase.from("activity_history").select("*").eq("user_id", user_id);

    if (error) {
        throw new Error(error.message);
    }

    return data as Todo[];
}

const addHistory = async ({ activity_id, title, description, date, user_id }: { activity_id: number, title: string, description?: string, date?: string, user_id: number }) => {
    const { error } = await supabase
        .from('activity_history')
        .insert({
            activity_id: activity_id,
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

export { getHistory, addHistory }