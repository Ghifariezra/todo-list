import Main from "@/components/common/main";
import HistoryActivity from "@/components/common/card/activity/history";
import Introduction from "@/components/common/introduction";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/services/history";

export default function History() {
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["activity_history"],
		queryFn: getHistory,
	});

	if (isLoading) {
		return (
			<Main id="history">
				<h1 className="text-center text-lg font-semibold text-gray-700">Loading...</h1>
			</Main>
		);
	}

	if (isError) {
		return (
			<Main id="history">
				<div className="flex flex-col items-center gap-2">
					<h1 className="text-red-600 font-semibold">Terjadi kesalahan</h1>
					<button onClick={() => refetch()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
						Coba Lagi
					</button>
				</div>
			</Main>
		);
	}

	return <Main id="history">{data && data.length > 0 ? <HistoryActivity data={data} /> : <Introduction title="Belum Ada Riwayat Aktivitas" />}</Main>;
}
