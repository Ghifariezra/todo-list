import type { Payload } from "@/lib/auth/jose";

const FetchUser = async ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<Payload | null>> }) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}me`, {
            method: 'GET',
            credentials: 'include',
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
        } else {
            setUser(null);
            return;
        }
    } catch {
        setUser(null);
    }
};

const Registrasi = async ({name, email, password, password_confirmation }: { name: string, email: string, password: string, password_confirmation: string }) => {
    const response = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
    })
    return response
};

const Login = async ({ email, password }: { email: string, password: string }) => {
    const response = await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    })
    return response
};

const Logout = async ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<Payload | null>> }) => {
    await fetch(`${import.meta.env.VITE_ALLOWED_HOSTS}logout`, {
        method: 'POST',
        credentials: 'include',
    });
    setUser(null);
};

export { Registrasi, Login, FetchUser, Logout };