'use client';

import * as React from 'react';
import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@utils/tailwind';

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

type SkillsItem = { name: string };
type ProjectItem = {
  slug: string;
  title: string;
  description: { short: string; long: string[] };
  images: { image: string; icon: string };
  links: { repo: string; extra: { title: string; url: string }[] };
  technologies: SkillsItem[];
  timeframe: { start: string; end: string };
};
type BlogItem = {
  slug: string;
  title: string;
  description: { short: string; long: string[] };
  images: { image: string; icon: string };
  technologies: SkillsItem[];
  timeframe: { published: string };
  estimatedReadingTime: number;
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
          className={cn('size-full', className)}
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
      className={cn('size-full', className)}
    />
  );
};

export const ProjectCards = async ({ data }: { data: ProjectItem[] }) => {
  const { data: projectsResponse, isLoading } = useProjects({ page: 1 });

  if (isLoading) {
    return <CardSkeleton cardCount={8} />;
  }
  return (
    <>
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
              technologies: [],
            }}
            date={project.createdAt ? new Date(project.createdAt) : 'Present'}
            renderReadingTime={false}
          />
        ))}
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
  estimatedReadingTime?: number;
  date: Date | string;
  renderReadingTime: boolean;
}
const RenderCard = React.forwardRef<HTMLDivElement, RenderCardProps>(
  ({ cardData, date, renderReadingTime, estimatedReadingTime, ...props }, ref) => (
    <TooltipProvider>
      <Card
        ref={ref}
        {...props}
        className="relative flex h-[30rem] w-64 flex-col overflow-hidden rounded-lg transition-all duration-300 hover:border-accent-light hover:shadow-lg dark:hover:border-accent-dark"
      >
        <AspectRatio ratio={1}>
          <Suspense fallback={<Skeleton className="size-64" />}>
            <ImageRender icon={cardData.icon} className="size-64" />
          </Suspense>
        </AspectRatio>

        {/* Hover */}
        {/* <Link href={cardData.githubLink} className="absolute inset-0 size-full" /> */}

        {/* Title */}
        <CardHeader>
          <CardTitle>{cardData.title}</CardTitle>
        </CardHeader>

        {/* Desc */}
        <CardContent>
          <CardDescription>{cardData.shortDescription}</CardDescription>
        </CardContent>

        <CardFooter className="mb-0 mt-auto flex flex-row items-center gap-1">
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
                <Link href={cardData.githubLink} target="_blank" className="text-sm font-light">
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
          {/* <p className="flex flex-row text-ellipsis text-xs font-light">
            {renderReadingTime && estimatedReadingTime ? (
              <>
                <BookOpen className="mr-1 size-4" /> ~{estimatedReadingTime} min
                {estimatedReadingTime > 1 ? 's' : ''}
              </>
            ) : !!cardData.technologies?.length ? (
              cardData.technologies
                .slice(0, 2)
                .map((tech) => tech.name)
                .join(', ') + (cardData.technologies.length > 2 ? '...' : '')
            ) : (
              'Unspecified'
            )}
          </p> */}
        </CardFooter>
      </Card>
    </TooltipProvider>
  ),
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
