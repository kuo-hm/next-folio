'use client';

import { axiosInstance } from '@/api';
import { useMutation } from '@tanstack/react-query';

interface Skill {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'other'; // Adjust types based on your actual skill types
  lightImageUrl: string;
  darkImageUrl: string;
  docsLink: string;
  createdAt: string;
  updatedAt: string;
}

interface EmailDto {
  email: string;
  type: string;
  subject: string;
  message: string;
}

export const useSendEmail = () => {
  return useMutation<void, unknown, EmailDto>({
    mutationFn: async (emailData: EmailDto): Promise<void> => {
      await axiosInstance.post('/public/email', emailData);
    },
  });
};
