import UserDto from '@/dtos/user.dto';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

const useGetCurrentUser = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setCurrentUser(session.user);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status, session]);

  const memoizedCurrentUser = useMemo(() => {
    return { currentUser, status, isAuthenticated };
  }, [currentUser, status, isAuthenticated]);

  return memoizedCurrentUser;
};

export default useGetCurrentUser;
