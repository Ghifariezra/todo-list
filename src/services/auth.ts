import {
    supabase
} from "@/lib/supabase/main";

// Simpan user baru
export const Registrasi = async ({ name, email, hashedPassword }: { name: string, email: string, hashedPassword: string }) => {
    const { error } = await supabase.from("users").insert({ name, email, password_hash: hashedPassword });

    if (error) throw new Error(error.message);
};

// Cek apakah email sudah terdaftar
export const Validasi = async ({ email }: { email: string }) => {
    const { data: existing, error } = await supabase.from("users").select("id").eq("email", email).single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    if (existing) throw new Error("Email sudah terdaftar");
};

// Cari user berdasarkan email
export const FindUser = async ({ email }: { email: string }) => {
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single();
    if (error || !user) throw new Error("Email tidak ditemukan");
    return user;
};