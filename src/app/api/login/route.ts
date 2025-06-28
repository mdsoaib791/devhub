import { signJwt } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("Login attempt:", email);

    const res = await axios.get(`${API_BASE}/users?email=${email}`);
    console.log("User fetch result:", res.data);

    const user = res.data[0];

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signJwt({ id: user.id, email: user.email, name: user.name });
    console.log("JWT issued:", token);

    return NextResponse.json({ token, user });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
