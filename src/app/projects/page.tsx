import { Metadata } from 'next';

import SearchUI from '@components/search';
import SearchPagination from '@components/search-pagination';
import { ProjectCards } from '@components/searchcards';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!',
};

interface PageParamProps {
  searchParams?: { query?: string; page?: string; tech?: string[] | string };
}

type ProjectItem = {
  slug: string;
  title: string;
  description: { short: string; long: string[] };
  images: { image: string; icon: string };
  links: { repo: string; extra: { title: string; url: string }[] };
  technologies: { name: string }[];
  timeframe: { start: string; end: string };
};

const ProjectsListPage = async ({ searchParams }: PageParamProps) => {
  const currentPage = Number(searchParams?.page ?? 1);

  const totalItems = 2;
  const data: ProjectItem[] = [
    {
      slug: '#',
      title: 'Under Construction',
      description: {
        short: 'Under Construction',
        long: ['Under Construction'],
      },
      images: {
        image: 'path/to/image1.jpg',
        icon: 'path/to/icon1.jpg',
      },
      links: {
        repo: 'https://github.com/kuo-hm',
        extra: [
          {
            title: 'Extra Link 1',
            url: 'https://hmoura.com',
          },
        ],
      },
      technologies: [
        {
          name: 'NextJs',
        },
      ],
      timeframe: {
        start: new Date('2023-01-01').toISOString(),
        end: new Date('2023-06-30').toISOString(),
      },
    },
  ];

  const skills = new Set<string>();
  data.forEach((tech) => {
    tech.technologies.forEach((skill) => skills.add(skill.name));
  });

  return (
    <div
      className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Filtering */}
      <SearchUI
        uri="/projects"
        skills={Array.from(skills)}
        placeholder="Search projects"
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech
            ? Array.from(
                Array.isArray(searchParams?.tech)
                  ? searchParams?.tech
                  : [searchParams?.tech],
              )
            : undefined,
        }}
      />

      <div className="mb-4 flex w-4/5 flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]">
        <ProjectCards data={data} />
      </div>

      <SearchPagination
        className="mx-auto mb-10 mt-auto"
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / 10)}
        searchParams={searchParams}
      />
    </div>
  );
};
export default ProjectsListPage;
