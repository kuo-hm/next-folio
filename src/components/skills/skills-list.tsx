'use client';

import { useSkills } from '@/utils/hooks/skills';
import { getImageUrl } from '@utils/helpers';

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex flex-col items-center rounded-lg border p-4 shadow-sm">
          {skill.imageUrl && (
            <img
              src={getImageUrl(skill.imageUrl)}
              alt={skill.name}
              className="mb-2 h-16 w-16 object-contain"
            />
          )}
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <p className="text-sm text-muted-foreground">{skill.type}</p>
          {skill.docsLink && (
            <a
              href={skill.docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Documentation
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
