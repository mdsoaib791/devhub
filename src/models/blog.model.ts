export interface BlogModel {
  id?: string;
  title: string;
  content: string;
  userId: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}


