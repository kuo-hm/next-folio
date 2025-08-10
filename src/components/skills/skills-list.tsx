'use client';

import { useSkills } from '@/utils/hooks/skills';
import Image from 'next/image';
import { Suspense } from 'react';
import { getImageUrl } from '../../utils/helpers';
import { ExternalLink } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { TooltipWrapper } from '../ui/tooltip';

export default function SkillsList() {
  const { data: skills, isLoading, isError } = useSkills();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-lg border p-4 shadow-sm animate-pulse"
          >
            <div className="mb-2 h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="mt-2 h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  if (isError) return <div>Error loading skills</div>;
  if (!skills?.length) return <div>No skills found</div>;

  return (
    <div className="flex max-w-[70%] flex-wrap justify-center gap-2">
      {skills.map((skill, key) => (
        <TooltipWrapper key={key} text={skill.name} asChild>
          <ExternalLink href={skill.docsLink} size="icon" variant="outline" className="relative">
            <Suspense fallback={<Skeleton className="relative size-full" />}>
              {skill?.darkImageUrl && skill?.lightImageUrl && (
                <>
                  <Image
                    src={getImageUrl(skill.lightImageUrl)}
                    alt="/images/dark.svg"
                    width={16}
                    unoptimized
                    height={16}
                    className="absolute size-6 scale-100 transition-all dark:scale-0"
                  />
                  <Image
                    src={getImageUrl(skill.darkImageUrl)}
                    alt="/images/light.svg"
                    width={16}
                    unoptimized
                    height={16}
                    className="absolute size-6 scale-0 transition-all dark:scale-100"
                  />
                </>
              )}
            </Suspense>
          </ExternalLink>
        </TooltipWrapper>
      ))}
    </div>
  );
}
