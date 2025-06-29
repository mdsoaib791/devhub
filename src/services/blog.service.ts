import { BlogModel } from "@/models/blog.model";
import axios from "axios";
import IBlogService from "./interfaces/iblog.service";


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default class BlogService implements IBlogService {
  async getAll() {
    const res = await axios.get(`${API_BASE}/blogs`);
    return res.data;
  }
  async getById(id: string) {
    const res = await axios.get(`${API_BASE}/blogs/${id}`);
    return res.data;
  }
  async add(model: BlogModel) {
    const res = await axios.post(`${API_BASE}/blogs`, model);
    return res.data;
  }
  async update(id: string, model: BlogModel) {
    const res = await axios.put(`${API_BASE}/blogs/${id}`, model);
    return res.data;
  }
  async delete(id: string) {
    const res = await axios.delete(`${API_BASE}/blogs/${id}`);
    return res.data;
  }
}
