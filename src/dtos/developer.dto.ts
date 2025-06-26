export interface DeveloperDto {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
  };
  blogs: {
    id: string;
    title: string;
    excerpt: string;
    date: string;
  }[];
}
