export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface DeveloperDto {
  id: number;
  userId: number; // <-- map to User
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  social: SocialLinks;
}
