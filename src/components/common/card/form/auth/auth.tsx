import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, useActionData } from 'react-router-dom';

function FormLogin() {
	const actionData = useActionData() as { error?: string; message?: string };

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<Form method="POST" action="/login" className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 text-blue-900">
				<h2 className="text-2xl font-bold text-center text-gray-800">Login ke Akunmu</h2>

				{/* Email */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="janedoe@gmail.com" autoComplete="email" required className="focus:ring-2 focus:ring-blue-500" />
				</div>

				{/* Password */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" placeholder="******" autoComplete="current-password" required className="focus:ring-2 focus:ring-blue-500" />
				</div>

				{/* Validation Messages */}
				{actionData?.error && <p className="text-sm text-red-500 bg-red-100 rounded-md p-2 text-center">{actionData.error}</p>}
				{actionData?.message && <p className="text-sm text-green-600 bg-green-100 rounded-md p-2 text-center">{actionData.message}</p>}

				{/* Button */}
				<Button type="submit" className="w-full bg-blue-600 hover:!bg-blue-700 text-white font-semibold py-2 rounded-md shadow transition-all duration-800 cursor-pointer">
					Login
				</Button>

				<p className="text-sm text-center text-gray-600">
					Belum punya akun?{' '}
					<a href="/register" className="text-blue-600 font-medium hover:underline cursor-pointer">
						Daftar disini
					</a>
				</p>
			</Form>
		</div>
	);
}

function FormRegis() {
	const actionData = useActionData() as { error?: string; message?: string };

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<Form method="POST" action="/register" className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 text-blue-900">
				<h2 className="text-2xl font-bold text-center">Buat Akun Baru</h2>

				{/* Name */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Nama Lengkap</Label>
					<Input id="name" name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
				</div>

				{/* Email */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="janedoe@gmail.com" autoComplete="email" required />
				</div>

				{/* Password */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" placeholder="******" autoComplete="new-password" required />
				</div>

				{/* Confirm Password */}
				<div className="flex flex-col gap-2">
					<Label htmlFor="confirm_password">Konfirmasi Password</Label>
					<Input id="confirm_password" name="confirm_password" type="password" placeholder="******" autoComplete="new-password" required />
				</div>

				{/* Validation Messages */}
				{actionData?.error && <p className="text-sm text-red-500 bg-red-100 rounded-md p-2 text-center">{actionData.error}</p>}
				{actionData?.message && <p className="text-sm text-green-600 bg-green-100 rounded-md p-2 text-center">{actionData.message}</p>}

				<Button type="submit" className="w-full bg-green-600 hover:!bg-green-700 text-white font-semibold py-2 rounded-md shadow transition-all duration-800 cursor-pointer">
					Daftar
				</Button>

				<p className="text-sm text-center text-gray-600">
					Sudah punya akun?{' '}
					<a href="/login" className="text-blue-600 font-medium hover:underline cursor-pointer">
						Login disini
					</a>
				</p>
			</Form>
		</div>
	);
}

export { FormLogin, FormRegis };
