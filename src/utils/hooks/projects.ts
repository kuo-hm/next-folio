import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api';

interface Project {
  id: string;
  title: string;
  description: string;
  // Add other project properties as needed
}

interface ProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
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
