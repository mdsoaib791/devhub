import { useMutation, useQuery } from '@tanstack/react-query';

import { iocContainer } from '@/ioc/container.ioc';
import { IOCTYPES } from '@/ioc/types.ioc';
import IUnitOfService from '@/services/interfaces/iunitof.service';
import LoginModel from '@/models/login.model';
import { UserModel } from '@/models/user.model';
import { ChangePasswordModel, ForgotPasswordModel, ResetPasswordModel } from '@/models/password.model';

const useLogin = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (model: LoginModel) => {
    return unitOfService.AccountService.login(model);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useGetAllSession = (enabled: boolean = true) => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  return useQuery({
    queryKey: ['AccountService.getAllSession'],
    queryFn: async () => {
      return await unitOfService.AccountService.getAllSession();
    },
    enabled: enabled,
  });
};

const useDbLogout = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (token: string) => {
    return unitOfService.AccountService.logout(token);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useLogoutAllSession = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async () => {
    return unitOfService.AccountService.logoutAllSession();
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useRegister = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (model: UserModel) => {
    return unitOfService.AccountService.register(model);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 201) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useForgotPassword = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (model: ForgotPasswordModel) => {
    return unitOfService.AccountService.forgotPassword(model);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useResetPassword = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (model: ResetPasswordModel) => {
    return unitOfService.AccountService.resetPassword(model);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

const useChangePassword = () => {
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);

  const mutationFn = async (model: ChangePasswordModel) => {
    return unitOfService.AccountService.changePassword(model);
  };

  return useMutation({
    mutationFn,
    onSettled: (response) => {
      if (response && response.status === 200) {
      }
    },
    onError: (error) => {
      return error;
    },
  });
};

export { useLogin, useGetAllSession, useDbLogout, useLogoutAllSession, useRegister, useForgotPassword, useResetPassword, useChangePassword };
