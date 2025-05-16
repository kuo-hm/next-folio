'use client';

import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api';

interface Skill {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'other'; // Adjust types based on your actual skill types
  imageUrl: string;
  docsLink: string;
  createdAt: string;
  updatedAt: string;
}

export const useSkills = () => {
  return useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Skill[]>('/public/skills');
      return data;
    },
  });
};
