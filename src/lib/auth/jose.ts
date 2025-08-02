import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET || "supersecret");

export interface Payload {
    id: number;
    email: string;
    [key: string]: unknown;
}

export async function generateToken(payload: Payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        throw new Error("Token tidak valid atau sudah expired");
    }
}
