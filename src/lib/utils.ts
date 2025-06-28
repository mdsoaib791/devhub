import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const SECRET = process.env.JWT_SECRET || "devhub_secret";

export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}
