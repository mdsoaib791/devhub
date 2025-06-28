export interface DeveloperModel {
  name: string;
  email: string;
  skills: string[];
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}
