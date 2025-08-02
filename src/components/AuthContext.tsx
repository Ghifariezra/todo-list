import { useState, useEffect } from "react";
import { verifyToken, type Payload } from "@/lib/auth/jose";
import { AuthContext } from "@/hooks/useAuth";
import { redirect } from "react-router-dom";

export function AuthProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<Payload | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		verifyToken(token)
			.then((payload) => setUser(payload as Payload))
			.catch(() => {
				localStorage.removeItem("token");
				setUser(null);
			});
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
        redirect("/login");
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}
