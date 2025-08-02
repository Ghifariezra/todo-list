import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/layouts/loading";
const Main = lazy(() => import("@/components/layouts/main"));
const Home = lazy(() => import("@/components/layouts/home"));
const History = lazy(() => import("@/components/layouts/history"));

const router = createBrowserRouter([
	{
		path: "/",
		Component: Main,
		children: [
			{ index: true, Component: Home },
			{ path: "/riwayat", Component: History },
		],
	},
]);

export default function App() {
	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}
