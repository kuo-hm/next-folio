import { axiosInstance } from '@/api';
import { useQuery } from '@tanstack/react-query';

export interface Project {
  id: string;
  name: string;
  description: string;
  websiteLink: string;
  githubLink: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseProjectsOptions {
  page?: number;
  limit?: number;
}

export const useProjects = ({ page = 1, limit = 10 }: UseProjectsOptions = {}) => {
  return useQuery<ProjectsResponse>({
    queryKey: ['projects', page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/public/projects`, { params: { page, limit } });
      return data;
    },
  });
};
