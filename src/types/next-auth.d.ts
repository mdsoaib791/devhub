import UserDto from '@/dtos/UserDto';

declare module 'next-auth' {
  interface Session {
    user: UserDto;
  }
}
