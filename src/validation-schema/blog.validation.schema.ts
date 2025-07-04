import { BlogModel } from "@/models/blog.model";
import * as yup from "yup";

export const blogValidationSchema: yup.ObjectSchema<BlogModel> = yup.object().shape({
  id: yup
    .string()
    .optional(),
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: yup
    .string()
    .required("Content is required"),
  userId: yup
    .string()
    .required("User ID is required"),
  social: yup.object({
    twitter: yup.string().optional(),
    github: yup.string().optional(),
    linkedin: yup.string().optional(),
    website: yup.string().optional(),
  }).optional(),
  createdAt: yup
    .string()
    .optional(),
  updatedAt: yup
    .string()
    .optional(),
});
