import {
    supabase
} from "@/lib/supabase/main";
import type { Todo } from "@/types/todos";

const getHistory = async () => {
    const { data, error } = await supabase.from("activity_history").select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data as Todo[];
}

const addHistory = async ({ activity_id, title, description, date }: { activity_id: number, title: string, description?: string, date?: string }) => {
    const { error } = await supabase
        .from('activity_history')
        .insert({
            activity_id: activity_id,
            title: title,
            description: description,
            schedule: date
        });

    if (error) {
        throw new Error(error.message);
    }

    return true;
}

export { getHistory, addHistory }