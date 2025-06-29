import { iocContainer } from '@/ioc/container.ioc';
import { IOCTYPES } from '@/ioc/types.ioc';
import { DeveloperModel } from '@/models/developer.model';
import IDeveloperService from '@/services/interfaces/ideveloper.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const developerService = iocContainer.get<IDeveloperService>(IOCTYPES.IDeveloperService);

const useGetAllDevelopers = () => {
  return useQuery({
    queryKey: ['DeveloperService.getAll'],
    queryFn: async () => {
      return await developerService.getAll();
    },
  });
};

const useGetDeveloperById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['DeveloperService.getById', id],
    queryFn: async () => {
      if (!id) return null;
      return await developerService.getById(id);
    },
    enabled: enabled,
  });
};

const useGetDeveloperByUserId = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['DeveloperService.getByUserId', userId],
    queryFn: async () => {
      if (!userId) return null;
      return await developerService.getByUserId(userId);
    },
    enabled: enabled,
  });
};

const useAddDeveloper = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (model: DeveloperModel) => {
    return developerService.add(model);
  };

  return useMutation({
    mutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['DeveloperService.getAll'],
      });
    },
    onError: (error) => {
      return error;
    },
  });
};

const useUpdateDeveloper = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (args: { id: string; model: DeveloperModel }) => {
    return developerService.update(args.id, args.model);
  };

  return useMutation({
    mutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['DeveloperService.getAll'],
      });
    },
    onError: (error) => {
      return error;
    },
  });
};

const useDeleteDeveloperById = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (id: string) => {
    return developerService.delete(id);
  };

  return useMutation({
    mutationFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['DeveloperService.getAll'],
      });
    },
    onError: (error) => {
      return error;
    },
  });
};

export {
  useAddDeveloper, useDeleteDeveloperById, useGetAllDevelopers, useGetDeveloperById, useGetDeveloperByUserId, useUpdateDeveloper
};

