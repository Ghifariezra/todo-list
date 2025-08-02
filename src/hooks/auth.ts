import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { Registrasi, Validasi, FindUser } from "@/services/auth";
import { redirect } from "react-router-dom";
import { generateToken } from "@/lib/auth/jose";

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

    if (password.length < 6) {
        return new Response(JSON.stringify({ error: "Password minimal 6 karakter" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: "Konfirmasi password tidak cocok" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    try {
        await Validasi({ email });
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        await Registrasi({ name, email, hashedPassword });

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
        const user = await FindUser({ email });
        const valid = compareSync(password, user.password_hash);

        if (!valid) {
            return new Response(JSON.stringify({ error: "Password salah" }), { status: 401, headers: { "Content-Type": "application/json" } });
        }

        const token = await generateToken({ id: user.id, email: user.email });

        // Wait until done make Backend Server
        localStorage.setItem("token", token);

        return window.location.href = "/";
    } catch (err: unknown) {
        let errorMessage = "Terjadi kesalahan pada server";
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
};