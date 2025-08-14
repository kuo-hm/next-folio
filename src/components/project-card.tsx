'use client';

import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@utils/tailwind';
import parse from 'html-react-parser';

import { AspectRatio } from '@components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { DotFilledIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Globe2Icon } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';
import { useProjects } from '../utils/hooks/projects';
import SearchPagination from './search-pagination';
import { ExternalLink } from './ui/button';
import { Dialog, DialogClose, DialogContent } from './ui/dialog';

type SkillsItem = {
  name: string;
  id: string;
  lightImageUrl: string;
  darkImageUrl: string;
  docsLink: string;
};

export const ImageRender = async ({ icon, className }: { icon?: any; className?: string }) => {
  if (!!icon) {
    try {
      return (
        <Image
          src={getImageUrl(icon)}
          alt="Image"
          width={500}
          height={500}
          unoptimized
          className={cn('object-contain ', className)}
        />
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Image
      src="/images/defaultCardPicture.png"
      alt="Image"
      width={500}
      height={500}
      className={cn('object-contain', className)}
    />
  );
};

export const ProjectCards = async () => {
  const { data: projectsResponse, isLoading } = useProjects({ page: 1 });

  if (isLoading) {
    return (
      <div className="mb-4 flex w-4/5 flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]">
        <CardSkeleton cardCount={8} />;
      </div>
    );
  }
  return (
    <>
      <div className="mb-4 flex w-4/5 flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]">
        {projectsResponse &&
          projectsResponse?.data &&
          projectsResponse?.data.length &&
          projectsResponse.data.map((project, key) => (
            <RenderCard
              key={key}
              cardData={{
                title: project.name,
                shortDescription: project.description,
                icon: project.imageUrl,
                githubLink: project.githubLink,
                link: project.websiteLink,
                technologies: project.skills,
              }}
              date={project.createdAt ? new Date(project.createdAt) : 'Present'}
            />
          ))}
      </div>{' '}
      <SearchPagination
        className="mx-auto mb-10 mt-auto"
        currentPage={projectsResponse?.meta.page || 0}
        totalPages={projectsResponse?.meta.totalPages || 0}
        searchParams={undefined}
      />{' '}
    </>
  );
};

interface RenderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardData: {
    title: string;
    shortDescription: string;
    link: string;
    githubLink: string;
    icon?: any;
    technologies?: SkillsItem[];
  };
  date: Date | string;
}
const RenderCard = React.forwardRef<HTMLDivElement, RenderCardProps>(
  ({ cardData, date, ...props }, ref) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialog = () => {
      setOpenDialog(true);
    };
    return (
      <TooltipProvider>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <Card
            ref={ref}
            {...props}
            className="relative flex h-[30rem] w-64 flex-col overflow-hidden rounded-lg transition-all duration-300 hover:border-accent-light hover:shadow-lg dark:hover:border-accent-dark"
          >
            <AspectRatio ratio={1} onClick={handleDialog} className="cursor-pointer">
              <Suspense fallback={<Skeleton className="size-64" />}>
                <ImageRender icon={cardData.icon} className="size-64" />
              </Suspense>
            </AspectRatio>

            {/* Hover */}
            {/* <Link href={cardData.githubLink} className="absolute inset-0 object-contain" /> */}

            {/* Title */}
            <CardHeader onClick={handleDialog} className="cursor-pointer">
              <CardTitle>{cardData.title}</CardTitle>
            </CardHeader>

            {/* Desc */}
            <CardContent className="flex justify-between flex-col">
              <CardDescription className="line-clamp-2">
                {parse(cardData.shortDescription)}
              </CardDescription>
              <CardDescription className="items-end"></CardDescription>
            </CardContent>

            <CardFooter className="mt-auto flex flex-col items-start gap-1">
              <p className="flex flex-row text-xs font-light">
                {!!cardData.technologies?.length
                  ? cardData.technologies
                      .slice(0, 3)
                      .map((tech) => tech.name)
                      .join(', ') + (cardData.technologies.length > 3 ? '...' : '')
                  : ''}
              </p>
              <div className="mb-0 mt-auto flex flex-row items-center gap-1">
                {/* Date */}
                <p className="w-fit text-sm font-light">
                  {typeof date === 'string'
                    ? date
                    : `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear().toString().slice(2)}`}
                </p>

                {/* Separator */}
                <DotFilledIcon />
                {cardData.githubLink && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={cardData.githubLink}
                        target="_blank"
                        className="text-sm font-light"
                      >
                        <GitHubLogoIcon className="size-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>This is a GitHub link</TooltipContent>
                  </Tooltip>
                )}
                {cardData.githubLink && cardData.link && <DotFilledIcon />}
                {cardData.link && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={cardData.link} target="_blank" className="text-sm font-light">
                        <Globe2Icon className="size-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>This is a website link</TooltipContent>
                  </Tooltip>
                )}
                {/* <DotFilledIcon /> */}
                {/* Technologies */}
              </div>
            </CardFooter>
          </Card>
          <DialogContent className="max-w-lg">
            <CardDetail data={cardData} />

            <DialogClose className="mt-4 btn">Close</DialogClose>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    );
  },
);
RenderCard.displayName = 'RenderCard';

export const CardSkeleton = ({ cardCount }: { cardCount: number }) => (
  <>
    {[...Array(cardCount)].map((_, key) => (
      <Card key={key} className="flex h-[30rem] w-64 flex-col overflow-hidden rounded-lg">
        <AspectRatio ratio={1} asChild>
          <Skeleton className="size-64 rounded-none" />
        </AspectRatio>

        {/* Title */}
        <CardHeader>
          <CardTitle>
            <Skeleton className="mb-1 h-6 w-40" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>

        {/* Desc */}
        <CardContent>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <Skeleton className="mb-1 h-4 w-20" />
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </CardContent>

        <CardFooter className="mb-0 mt-auto flex flex-row items-center gap-1">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-5 w-14" />
        </CardFooter>
      </Card>
    ))}
  </>
);

const CardDetail = ({
  data,
}: {
  data: {
    title: string;
    shortDescription: string;
    link: string;
    githubLink: string;
    icon?: any;
    technologies?: SkillsItem[];
  };
}) => {
  const { title, shortDescription, link, githubLink, icon, technologies } = data;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{parse(shortDescription)}</p>

      <div className="flex gap-4 mb-4">
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
            Live Demo
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        )}
      </div>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((skill) => (
            <div key={skill.id} className="relative w-6 h-6">
              <Suspense fallback={<Skeleton className="relative size-full" />}>
                {' '}
                <ExternalLink
                  href={skill.docsLink}
                  size="icon"
                  variant="ghost"
                  className="relative"
                >
                  {skill.lightImageUrl && skill.darkImageUrl && (
                    <>
                      <Image
                        src={getImageUrl(skill.lightImageUrl)}
                        alt={skill.name + ' light'}
                        width={16}
                        height={16}
                        unoptimized
                        className="absolute w-4 h-4 scale-100 transition-all dark:scale-0"
                      />
                      <Image
                        src={getImageUrl(skill.darkImageUrl)}
                        alt={skill.name + ' dark'}
                        width={16}
                        height={16}
                        unoptimized
                        className="absolute w-4 h-4 scale-0 transition-all dark:scale-100"
                      />
                    </>
                  )}
                </ExternalLink>
              </Suspense>
            </div>
          ))}
        </div>
      )}

      {icon && (
        <div className="w-full">
          <Suspense fallback={<Skeleton className="w-full h-64" />}>
            <ImageRender icon={icon} className="w-full h-auto object-contain" />
          </Suspense>
        </div>
      )}
    </div>
  );
};
