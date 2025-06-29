import { DeveloperModel } from "@/models/developer.model";
import axios from "axios";
import IDeveloperService from "./interfaces/ideveloper.service";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default class DeveloperService implements IDeveloperService {
  async getAll() {
    const res = await axios.get(`${API_BASE}/developers`);
    return res.data;
  }
  async getById(id: string) {
    const res = await axios.get(`${API_BASE}/developers/${id}`);
    return res.data;
  }
  async getByUserId(userId: string) {
    const res = await axios.get(`${API_BASE}/developers?userId=${userId}`);
    // json-server returns an array, so return the first match or null
    return res.data[0] || null;
  }
  async add(model: DeveloperModel) {
    const res = await axios.post(`${API_BASE}/developers`, model);
    return res.data;
  }
  async update(id: string, model: DeveloperModel) {
    const res = await axios.put(`${API_BASE}/developers/${id}`, model);
    return res.data;
  }
  async delete(id: string) {
    const res = await axios.delete(`${API_BASE}/developers/${id}`);
    return res.data;
  }
}
