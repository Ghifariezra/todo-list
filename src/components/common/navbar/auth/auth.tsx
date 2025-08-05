import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const LinkPath = [
	{
		name: "Login",
		href: "/login",
		variant: "outline" as const,
		className: "text-blue-600 border-blue-600 hover:bg-blue-50",
	},
	{
		name: "Daftar",
		href: "/register",
		variant: "default" as const,
		className: "bg-blue-600 hover:bg-blue-700 text-white",
	},
];

const Auth = function Auth({ className }: { className?: string }) {
	const { user: token, logout: handleLogout } = useAuth();

	return (
		<ul className={`${className} items-center gap-4 font-medium`}>
			{token ? (
				<li>
					<Button
						variant="destructive"
						className="rounded-lg px-6 py-2 transition-all duration-300 shadow-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer"
						onClick={async () => {
							await handleLogout();
							window.location.href = '/';
						}}>
						Logout
					</Button>
				</li>
			) : (
				LinkPath.map((link) => (
					<li key={link.name}>
						<Button asChild variant={link.variant} className={`rounded-lg px-6 py-2 transition-all duration-300 shadow-sm ${link.className}`}>
							<Link to={link.href}>{link.name}</Link>
						</Button>
					</li>
				))
			)}
		</ul>
	);
}

export default Auth;
