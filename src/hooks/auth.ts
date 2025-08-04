import { Registrasi, Login } from "@/services/auth";
import { redirect } from "react-router-dom";

// REGISTER ACTION
export const RegisterAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm_password")?.toString();

    if (!name || !email || !password || !confirmPassword) {
        return new Response(JSON.stringify({ error: "Semua field wajib diisi" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: "Format email tidak valid" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (password.length < 8) {
        return new Response(JSON.stringify({ error: "Password minimal 8 karakter" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: "Konfirmasi password tidak cocok" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    try {
        const user = await Registrasi({ name, email, password, password_confirmation: confirmPassword });

        if (user.status === 401) {
            return new Response(JSON.stringify({ error: "Email sudah terdaftar" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        return redirect("/login");
    } catch (err: unknown) {
        let errorMessage = "Terjadi kesalahan pada server";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
};

// LOGIN ACTION
export const LoginAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email dan password wajib diisi" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    try {
        const user = await Login({ email, password });

        if (user.status === 401) {
            return new Response(JSON.stringify({ error: "Email atau password salah" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        return window.location.href = "/";
    } catch (err: unknown) {
        let errorMessage = "Terjadi kesalahan pada server";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
};