import { memo, useState, useCallback, useEffect } from 'react';
import AddCard from '@/components/common/card/form/card-template/display';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar28 } from '@/components/common/card/form/card-template/date-picker';
import { addTodo, updateTodo } from '@/services/activity';
import type { Todo } from '@/types/todos';
import { useAuth } from '@/hooks/useAuth';

const FormAdd = memo(({ refetch }: { refetch: () => void }) => {
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [form, setForm] = useState({
		title: '',
		date: '',
		description: '',
	});
	const { user } = useAuth();

	const toggleMenu = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleDateChange = useCallback((date: string) => setForm((prev) => ({ ...prev, date })), []);

	const onSubmitData = useCallback(async () => {
		try {
			if (!form.title) return null;
			await addTodo({ ...form, user_id: user?.id as number });
			setSuccess('Berhasil menambahkan todo');
			setForm({ title: '', date: '', description: '' });
			toggleMenu();
			refetch();
		} catch (err) {
			console.error(err);
			setError('Gagal menambahkan todo');
		}
	}, [form, toggleMenu, refetch, user]);

	return (
		<div className="flex flex-col gap-4 items-center">
			<AddCard {...{ open, toggleMenu, onSubmitData }} className="grid grid-cols-2 grid-rows-1 gap-4">
				<div className="flex flex-col gap-2 w-full">
					<Label>Title</Label>
					<Input placeholder="" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Calendar28 onDateChange={handleDateChange} />
				</div>
				<div className="flex flex-col gap-2 w-full col-span-2">
					<Label>Description</Label>
					<Input placeholder="" onChange={(e) => setForm({ ...form, description: e.target.value })} />
					{success && <p className="text-green-600 font-medium">{success}</p>}
					{error && <p className="text-red-600 font-medium">{error}</p>}
				</div>
			</AddCard>
		</div>
	);
});

const FormUpdate = memo(({ refetch, data, id }: { refetch: () => void; data: Todo[]; id: number }) => {
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [form, setForm] = useState({
		title: '',
		date: '',
		description: '',
	});
	const { user } = useAuth();

	const toggleMenu = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleDateChange = useCallback((date: string) => setForm((prev) => ({ ...prev, date })), []);

	const onSubmitData = useCallback(async () => {
		try {
			if (!form.title) return null;
			await updateTodo(id, user?.id as number, {
				title: form.title,
				description: form.description,
				schedule: form.date,
			});
			setSuccess('Berhasil menambahkan todo');
			setForm({ title: '', date: '', description: '' });
			toggleMenu();
			refetch();
		} catch (err) {
			console.error(err);
			setError('Gagal menambahkan todo');
		}
	}, [form, toggleMenu, refetch, id, user]);

	useEffect(() => {
		const todo = data.find((todo) => todo.is_completed === false && todo.id === id);
		if (todo) {
			setForm({
				title: todo.title ?? '',
				date: todo.schedule ?? '',
				description: todo.description ?? '',
			});
		}
	}, [data, id]);

	return (
		<div className="flex flex-col gap-4 items-center">
			<AddCard {...{ open, toggleMenu, onSubmitData, title: 'Update Jadwal', description: 'Update Jadwal Lama' }} className="grid grid-cols-2 grid-rows-1 gap-4">
				<div className="flex flex-col gap-2 w-full">
					<Label>Title</Label>
					<Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Calendar28 onDateChange={handleDateChange} dateUpdate={form.date as unknown as Date} />
				</div>
				<div className="flex flex-col gap-2 w-full col-span-2">
					<Label>Description</Label>
					<Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
					{success && <p className="text-green-600 font-medium">{success}</p>}
					{error && <p className="text-red-600 font-medium">{error}</p>}
				</div>
			</AddCard>
		</div>
	);
});

export { FormAdd, FormUpdate };
