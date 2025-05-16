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
import { DotFilledIcon } from '@radix-ui/react-icons';
import { BookOpen } from 'lucide-react';

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

export const ImageRender = async ({
  icon,
  className,
}: {
  icon?: any;
  className?: string;
}) => {
  if (!!icon) {
    try {
      return (
        <Image
          src={'/images/defaultCardPicture.png'}
          alt="Image"
          width={500}
          height={500}
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

export const ProjectCards = async ({ data }: { data: ProjectItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>Looks like no projects were found, try a different search term!</p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/projects/${project.slug}`,
            technologies: project?.technologies,
          }}
          date={
            project.timeframe?.end ? new Date(project.timeframe.end) : 'Present'
          }
          renderReadingTime={false}
        />
      ))
    )}
  </>
);

export const BlogCards = async ({ data }: { data: BlogItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>Looks like no blogs were found, try a different search term!</p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/blog/${project.slug}`,
            technologies: project?.technologies,
          }}
          estimatedReadingTime={project.estimatedReadingTime}
          date={new Date(project.timeframe?.published)}
          renderReadingTime={true}
        />
      ))
    )}
  </>
);

interface RenderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardData: {
    title: string;
    shortDescription: string;
    link: string;
    icon?: any;
    technologies?: SkillsItem[];
  };
  estimatedReadingTime?: number;
  date: Date | string;
  renderReadingTime: boolean;
}
const RenderCard = React.forwardRef<HTMLDivElement, RenderCardProps>(
  (
    { cardData, date, renderReadingTime, estimatedReadingTime, ...props },
    ref,
  ) => (
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
      <Link href={cardData.link} className="absolute inset-0 size-full" />

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
            : `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`}
        </p>

        {/* Separator */}
        <DotFilledIcon />

        {/* Technologies */}
        <p className="flex flex-row text-ellipsis text-xs font-light">
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
        </p>
      </CardFooter>
    </Card>
  ),
);
RenderCard.displayName = 'RenderCard';

export const CardSkeleton = ({ cardCount }: { cardCount: number }) => (
  <>
    {[...Array(cardCount)].map((_, key) => (
      <Card
        key={key}
        className="flex h-[30rem] w-64 flex-col overflow-hidden rounded-lg"
      >
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
