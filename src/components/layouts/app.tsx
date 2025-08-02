import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/layouts/loading";
import { LoginAction, RegisterAction } from "@/hooks/auth";
import { FormLogin, FormRegis } from "@/components/common/card/form/auth/auth";
const Main = lazy(() => import("@/components/layouts/main"));
const Home = lazy(() => import("@/components/layouts/home"));
const History = lazy(() => import("@/components/layouts/history"));
const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));

const router = createBrowserRouter([
	{
		path: "/",
		Component: Main,
		children: [
			{ index: true, Component: Home },
			{
				path: "/riwayat",
				element: (
					<ProtectedRoute>
						<History />
					</ProtectedRoute>
				),
			},
			{ path: "/login", Component: FormLogin, action: LoginAction },
			{ path: "/register", Component: FormRegis, action: RegisterAction },
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
