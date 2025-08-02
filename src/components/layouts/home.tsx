import Header from "@/components/common/header";
import Navbar from "@/components/common/navbar/navbar";
import Main from "@/components/common/main";
import Introduction from "@/components/common/introduction";
import Post from "@/components/common/post";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/services/todos";
import { ActivityDisplay } from "@/components/common/card/activity/display";
import { useCallback } from "react";

export default function Home() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["activity"],
		queryFn: () => getTodos(),
	});
	const handleRefetch = useCallback(() => refetch(), [refetch]);

	return (
		<div className="min-h-screen text-blue-600 transition-all">
			<Header>
				<Navbar />
			</Header>
			<Main>{data?.length ? <ActivityDisplay data={data} isLoading={isLoading} refetch={handleRefetch} /> : <Introduction />}</Main>
			<Post refetch={handleRefetch} />
		</div>
	);
}
