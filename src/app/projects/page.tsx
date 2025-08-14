import { Metadata } from 'next';

import { ProjectCards } from '@components/project-card';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!',
};

interface PageParamProps {
  searchParams?: { query?: string; page?: string; tech?: string[] | string };
}

const ProjectsListPage = async ({ searchParams }: PageParamProps) => {
  return (
    <div
      className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center pt-8"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Filtering */}
      {/* <SearchUI
        uri="/projects"
        skills={Array.from(skills)}
        placeholder="Search projects"
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech
            ? Array.from(
                Array.isArray(searchParams?.tech) ? searchParams?.tech : [searchParams?.tech],
              )
            : undefined,
        }}
      /> */}

      <ProjectCards />
    </div>
  );
};
export default ProjectsListPage;
