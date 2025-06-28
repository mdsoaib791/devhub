export default interface UserDto {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export default interface CurrentUserDto {
  id: number;
  email: string;
  name: string;
  avatar: string;
  token?: string;
}
