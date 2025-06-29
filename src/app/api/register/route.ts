import { signJwt } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const res = await axios.get(`${API_BASE}/users?email=${email}`);
    if (res.data.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Create user
    const userRes = await axios.post(`${API_BASE}/users`, { email, password, name });
    const user = userRes.data;

    // Optionally create developer profile
    await axios.post(`${API_BASE}/developers`, {
      userId: user.id,
      name: user.name,
      email: user.email,
      bio: "",
      avatar: "",
      skills: [],
    });

    // Issue JWT
    const token = signJwt({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
