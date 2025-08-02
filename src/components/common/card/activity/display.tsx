import { useCallback, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/types/todos";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { updateTodo, deleteTodos } from "@/services/activity";
import { addHistory } from "@/services/history";
import { FormUpdate } from "@/components/common/card/form/form-post";

const formmatDate = (date: string) => {
	if (!date) return "";
	return new Date(date).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};

export function ActivityDisplay({ data, isLoading, refetch }: { data: Todo[]; isLoading: boolean; refetch: () => void }) {
	const [open, setOpen] = useState(false);
	const [updateId, setUpdateId] = useState(0);

	const toggleForm = useCallback((id: number) => {
		setOpen((prev) => !prev);
		setUpdateId(id);
	}, []);

	const handleDelete = useCallback(
		async (id: number) => {
			await deleteTodos(id);
			refetch();
		},
		[refetch]
	);

	const handleUpdate = useCallback(
		async (id: number, is_completed: boolean, data: Todo[]) => {
			await addHistory({
				activity_id: id,
				title: data.find((todo) => todo.id === id)?.title as string,
				description: data.find((todo) => todo.id === id)?.description as string,
				date: data.find((todo) => todo.id === id)?.schedule as string,
			});
			await updateTodo(id, { is_completed: !is_completed });
			refetch();
		},
		[refetch]
	);

	return (
		<>
			{isLoading ? (
				<Card>
					<CardHeader>
						<CardTitle>Loading...</CardTitle>
					</CardHeader>
				</Card>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
					{data.map((todo) => {
						return (
							<>
								{!todo.is_completed && (
									<Card key={todo.id}>
										<CardHeader className="block h-full">
											<div className="flex flex-col gap-4">
												{/* Header Atas */}
												<div className="flex items-center justify-between">
													<Badge className="bg-blue-800 text-white px-3 py-1 rounded-md text-sm font-semibold">{formmatDate(todo.schedule as string)}</Badge>
													<X onClick={() => handleDelete(todo.id)} className="size-5 text-red-500 hover:text-red-700 cursor-pointer transition-colors" />
												</div>

												{/* Konten Judul & Deskripsi */}
												<div className="flex flex-col gap-2">
													<CardTitle className="text-lg font-bold text-gray-900">{todo.title}</CardTitle>
													<CardDescription className="text-sm text-gray-600 break-all">{todo.description}</CardDescription>
												</div>
											</div>
										</CardHeader>
										{todo.is_completed ? null : (
											<CardAction className="flex flex-row gap-2 w-full px-6">
												<Button onClick={() => handleUpdate(todo.id, todo.is_completed, data)} className="flex-1 bg-green-600 hover:!bg-green-700 duration-800 ease-in-out cursor-pointer">
													Selesai
												</Button>
												<Button onClick={() => toggleForm(todo.id)} className="flex-1 bg-blue-600 hover:!bg-blue-700 duration-800 ease-in-out cursor-pointer">
													Edit
												</Button>
											</CardAction>
										)}
									</Card>
								)}
							</>
						);
					})}
				</div>
			)}
			{open && <FormUpdate refetch={refetch} id={updateId} data={data} />}
		</>
	);
}
