import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddCard({ children, className, open, toggleMenu, onSubmitData, title, description }: React.PropsWithChildren<{ className?: string; open: boolean; toggleMenu: () => void, onSubmitData: () => void, title?: string, description?: string }>) {
	if (open) return null;
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitData();
				}}
			>
				<Card className="max-w-sm">
					<CardHeader>
						<div className="flex flex-col gap-2 items-center text-xl">
							<CardTitle>{title || "Tambah Jadwal"}</CardTitle>
							<CardDescription>{description || "Tambahkan Jadwal Baru"}</CardDescription>
						</div>
					</CardHeader>
					<CardContent className={className}>{children}</CardContent>
					<CardFooter className="relative w-full">
						<CardAction className="flex flex-col gap-2 w-full">
							<Button type="submit" className="cursor-pointer bg-blue-600 hover:!bg-blue-700 w-full duration-800 ease-in-out">
								Tambah Jadwal
							</Button>
							<Button onClick={toggleMenu} className="cursor-pointer bg-red-600 hover:!bg-red-700 w-full duration-800 ease-in-out">
								Batal
							</Button>
						</CardAction>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
