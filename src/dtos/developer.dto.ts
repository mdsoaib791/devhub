export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface DeveloperDto {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  skills: string[];
  social: SocialLinks;
}
