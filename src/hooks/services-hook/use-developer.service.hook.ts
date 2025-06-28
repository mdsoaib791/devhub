import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { iocContainer } from '@/ioc/container.ioc';
import { IOCTYPES } from '@/ioc/types.ioc';

import IUnitOfService from '@/services/interfaces/iunitof.service';

import { DeveloperModel } from '@/models/developer.model';
import { DeveloperListParams } from '@/params/developer-list.params';

const useGetAllDevelopers = (p: DeveloperListParams, enabled: boolean = true) => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  return useQuery({
    queryKey: ['DeveloperService.getAll', p],
    queryFn: async () => {
      return await unitOfService.DeveloperService.getAll();
    },
    enabled: enabled,
  });
};

const useGetDeveloperById = (id: number, enabled: boolean = true) => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  return useQuery({
    queryKey: ['DeveloperService.getById', id],
    queryFn: async () => {
      if (!id) return null;
      return await unitOfService.DeveloperService.getById(id);
    },
    enabled: enabled,
  });
};

const useAddDeveloper = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);
  const queryClient = useQueryClient();

  const mutationFn = async (model: DeveloperModel) => {
    return unitOfService.DeveloperService.add(model);
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
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);
  const queryClient = useQueryClient();

  const mutationFn = async (args: { id: number; model: DeveloperModel }) => {
    return unitOfService.DeveloperService.update(args.id, args.model);
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
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);
  const queryClient = useQueryClient();
  const mutationFn = async (id: number) => {
    return unitOfService.DeveloperService.delete(id);
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
  useAddDeveloper, useDeleteDeveloperById, useGetAllDevelopers,
  useGetDeveloperById,
  useUpdateDeveloper
};

