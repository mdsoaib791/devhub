'use client';

import UserDto from '@/dtos/user.dto';
import { iocContainer } from '@/ioc/container.ioc';
import { IOCTYPES } from '@/ioc/types.ioc';
import IUnitOfService from '@/services/interfaces/iunitof.service';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function useLogout() {
  const { data: session, status } = useSession();
  const unitOfService = iocContainer.get<IUnitOfService>(IOCTYPES.IUnitOfService);
  const [currentUser, setCurrentUser] = useState<UserDto>();

  useEffect(() => {
    if (status && status === 'authenticated' && session && session.user) {
      setCurrentUser(session.user);
    }
  }, [status, session]);

  async function logout() {
    await unitOfService.AccountService.logout(currentUser?.token || '');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('at');
      localStorage.removeItem('utz');
      localStorage.removeItem('locales');
      localStorage.removeItem('fullName');
      localStorage.removeItem('profilePicture');
    }
    await signOut({ callbackUrl: '/' });
  }

  return logout;
}
