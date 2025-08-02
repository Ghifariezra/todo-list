import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
		setLoading(false);
	}, [navigate]);

	if (loading) return <p>Loading...</p>;

	return children;
}
