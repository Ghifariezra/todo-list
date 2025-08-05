import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import type { Payload } from '@/lib/auth/jose';
import { FetchUser, Logout } from '@/services/auth';

export function AuthProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<Payload | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await FetchUser({ setUser });
			setLoading(false);
		};
		fetchData();
	}, []);

	const logout = useCallback(async () => {
		try {
			await Logout({ setUser });
			setUser(null);
		} catch (err) {
			console.error('Logout error:', err);
		}
	}, []);

	if (loading) {
		// bisa diganti skeleton / spinner kalau mau
		return <div>Loading...</div>;
	}

	return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}
