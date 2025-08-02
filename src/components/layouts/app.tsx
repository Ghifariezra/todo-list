import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/layouts/loading";
const Home = lazy(() => import("@/components/layouts/home"));

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ index: true, Component: Home },
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
