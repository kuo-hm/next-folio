'use client';

import { axiosInstance } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { LanguageEnum } from '../helpers/enum/language';

interface Resume {
  id: string;
  fileName: string;
  language: LanguageEnum;
  createdAt: string;
  updatedAt: string;
  filePath: string;
}
export const useResumes = () => {
  return useQuery<Resume[]>({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Resume[]>('/public/resumes');
      return data || [];
    },
  });
};
