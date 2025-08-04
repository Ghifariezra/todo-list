import { useState, useEffect } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import type { Payload } from '@/lib/auth/jose';
import { FetchUser, Logout } from '@/services/auth';

export function AuthProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<Payload | null>(null);

	useEffect(() => {
		FetchUser({ setUser });
	}, []);

	const logout = async () => {
		Logout({ setUser });
	};

	return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}
