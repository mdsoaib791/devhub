import { iocContainer } from "@/ioc/container.ioc";
import { IOCTYPES } from "@/ioc/types.ioc";
import { BlogModel } from "@/models/blog.model";
import IBlogService from "@/services/interfaces/iblog.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const blogService = iocContainer.get<IBlogService>(IOCTYPES.IBlogService);

export const useGetAllBlogs = () =>
  useQuery({ queryKey: ["blogs"], queryFn: () => blogService.getAll() });

export const useGetBlogById = (id: string) =>
  useQuery({ queryKey: ["blog", id], queryFn: () => blogService.getById(id), enabled: !!id });

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (model: BlogModel) => blogService.add(model),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, model }: { id: string; model: BlogModel }) => blogService.update(id, model),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};
