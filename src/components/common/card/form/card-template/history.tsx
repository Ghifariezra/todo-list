import { Label } from "@/components/ui/label";
export default function CardHistory({ children }: React.PropsWithChildren) {
	return (
		<div className="flex flex-col gap-8">
			<Label className="block text-2xl text-center font-bold">Riwayat Aktivitas</Label>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">{children}</div>
		</div>
	);
}
