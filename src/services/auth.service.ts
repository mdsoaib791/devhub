import axios from "axios";
import AuthModel from "@/models/auth.model";
import RegisterModel from "@/models/register.model";
import IAuthService from "./interfaces/iauth.service";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default class AuthService implements IAuthService {
  async login(model: AuthModel): Promise<any> {
    const res = await axios.post(`${API_BASE}/login`, model);
    return res.data;
  }
  async register(model: RegisterModel): Promise<any> {
    const res = await axios.post(`${API_BASE}/register`, model);
    return res.data;
  }
}
