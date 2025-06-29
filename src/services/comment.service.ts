import { CommentModel } from "@/models/comment.model";
import axios from "axios";
import ICommentService from "./interfaces/icomment.service";


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default class CommentService implements ICommentService {
  async getByBlogId(blogId: string) {
    const res = await axios.get(`${API_BASE}/comments?blogId=${blogId}`);
    return res.data;
  }
  async add(model: CommentModel) {
    const res = await axios.post(`${API_BASE}/comments`, model);
    return res.data;
  }
  async delete(id: string) {
    const res = await axios.delete(`${API_BASE}/comments/${id}`);
    return res.data;
  }
}
