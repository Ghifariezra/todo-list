import CardHistory from "@/components/common/card/form/card-template/history";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/services/history";
import { formmatDate } from "@/lib/converter-data/date";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HistoryActivity() {
	const { data } = useQuery({
		queryKey: ["activity_history"],
		queryFn: getHistory,
	});

	return (
		<CardHistory>
			{data?.map((history) => (
				<Card key={history.id}>
					<CardHeader className="block h-full">
						<div className="flex flex-col gap-4">
							{/* Header Atas */}
							<div className="flex items-center justify-between">
								<Badge className="bg-green-800 text-white px-3 py-1 rounded-md text-sm font-semibold">Done</Badge>
								<Badge variant="outline" className="px-3 py-1 rounded-md text-sm font-semibold">{formmatDate(history.schedule as string)}</Badge>
							</div>

							{/* Konten Judul & Deskripsi */}
							<div className="flex flex-col gap-2">
								<CardTitle className="text-lg font-bold text-gray-900">{history.title}</CardTitle>
								<CardDescription className="text-sm text-gray-600 break-all">{history.description}</CardDescription>
							</div>
						</div>
					</CardHeader>
				</Card>
			))}
		</CardHistory>
	);
}
