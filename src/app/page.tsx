import Image from 'next/image';
import { Suspense } from 'react';

import { ExternalLink, InternalLink } from '@components/ui/button';
import { SmoothScroll } from '@components/ui/clientbutton';
import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';
import { TooltipWrapper } from '@components/ui/tooltip';

import { ArrowTopRightIcon, BackpackIcon } from '@radix-ui/react-icons';

const HomePage = () => {
  return (
    <div className="mt-16 h-fit w-full">
      <div
        className="mx-auto flex w-fit flex-col justify-center pb-16 max-sm:items-center max-sm:text-center"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Introduction and what I do */}
        <p>Hi, I&apos;m Oussama</p>
        <h1 className="mb-4 text-5xl font-bold">
          I Bring{' '}
          <span className="text-accent-light dark:text-accent-dark">Ideas</span>{' '}
          to Life
        </h1>
        <p className="break-normal text-lg max-sm:max-w-xs">
          I&apos;m a{' '}
          <span className="text-xl font-medium text-black dark:text-white">
            full-stack developer
          </span>{' '}
          and hobbyist gamer based in Morocco.
        </p>

        {/* Links */}
        <div className="mt-6 flex w-fit flex-wrap gap-4">
          <Separator className="mb-0" />

          <TooltipWrapper text="More about me!" asChild>
            <SmoothScroll variant="outline" toId="about">
              About Me
            </SmoothScroll>
          </TooltipWrapper>

          <TooltipWrapper text="View my projects!" asChild>
            <InternalLink href="/projects" variant="outline">
              My Projects <ArrowTopRightIcon className="ml-2" />
            </InternalLink>
          </TooltipWrapper>
        </div>
      </div>

      {/* About me */}
      <div
        id="about"
        className="flex h-screen w-full flex-col items-center justify-center gap-4"
      >
        <div className="flex w-3/5 flex-col items-center justify-center text-center text-lg max-md:w-3/4 max-sm:w-[97.5%]">
          <h1 className="mb-8 text-5xl font-bold">
            I AM{' '}
            <span className="text-accent-light dark:text-accent-dark">
              PASSIONATE
            </span>{' '}
            AND
            <span className="text-accent-light dark:text-accent-dark">
              {' '}
              ALWAYS LEARNING
            </span>
          </h1>

          <p className="mb-2 max-sm:max-w-[70%]">
            I started my journey developing
            <span className="font-bold text-accent-light dark:text-accent-dark">
              {' '}
              {new Date().getUTCFullYear() - 2018}+ years ago
            </span>
            .
          </p>
          <p className="mb-8 max-w-2xl">
            Now I create software like{' '}
            <span className="font-bold text-accent-light dark:text-accent-dark">
              this website
            </span>{' '}
            and web applications using
            <span className="font-bold text-accent-light dark:text-accent-dark">
              {' '}
              NextJS
            </span>{' '}
            and
            <span className="font-bold text-accent-light dark:text-accent-dark">
              {' '}
              NestJS
            </span>{' '}
            and libraries in
            <span className="font-bold text-accent-light dark:text-accent-dark">
              {' '}
              Python
            </span>
            .
          </p>

          <p>
            I&apos;m always looking for new and exciting projects to work on!
          </p>
          <Separator className="mb-4 mt-2 h-px w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]" />

          <div className="flex flex-row gap-2">
            <SmoothScroll variant="outline" toId="skills">
              My Skills
            </SmoothScroll>

            <InternalLink href="/contact" variant="outline">
              <BackpackIcon className="mr-2" />
              Hire me
            </InternalLink>
          </div>
        </div>
      </div>

      {/* My Skills */}
      <div
        id="skills"
        className="flex size-full min-h-screen flex-col items-center justify-center gap-4"
      >
        <div className="flex w-3/5 flex-col items-center justify-center text-center text-lg max-md:w-3/4 max-sm:w-[97.5%]">
          <h1 className="mb-8 text-5xl font-bold">
            MY{' '}
            <span className="text-accent-light dark:text-accent-dark">
              SKILLS
            </span>
          </h1>

          <div className="flex max-w-[70%] flex-wrap justify-center gap-2">
            <RenderSkills />
          </div>

          <Separator className="mb-4 mt-8 h-px w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]" />
          <div className="flex flex-wrap items-center gap-2">
            <TooltipWrapper text="See how I used my skills!" asChild>
              <InternalLink href="/projects" variant="outline">
                My Projects <ArrowTopRightIcon className="ml-2" />
              </InternalLink>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

const RenderSkills = async () => {
  const skills = [
    {
      name: 'ReactJs',
      href: 'https://react.dev/',
      icon: { dark: false, light: true },
      image: '/images/react.svg',
    },
    {
      name: 'Radix',
      href: 'https://www.radix-ui.com/',
      icon: { dark: false, light: true },
      image: '/images/radix.svg',
    },
    {
      name: 'CSharp',
      href: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      icon: { dark: false, light: true },
      image: '/images/CSharp.svg',
    },
    {
      name: 'Fedora',
      href: 'https://fedoraproject.org/',
      icon: { dark: false, light: true },
      image: '/images/Fedora.svg',
    },
    {
      name: 'Sqlite',
      href: 'https://www.sqlite.org/',
      icon: { dark: false, light: true },
      image: '/images/Sqlite.svg',
    },
    {
      name: 'Flask',
      href: 'https://flask.palletsprojects.com',
      icon: { dark: false, light: true },
      image: '/images/Flask.svg',
    },
    {
      name: 'Nginx',
      href: 'https://www.nginx.com/',
      icon: { dark: false, light: true },
      image: '/images/Nginx.svg',
    },
    {
      name: 'Sass',
      href: 'https://sass-lang.com/',
      icon: { dark: false, light: true },
      image: '/images/Sass.svg',
    },
    {
      name: 'JavaScript',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      icon: { dark: false, light: true },
      image: '/images/JavaScript.svg',
    },
    {
      name: 'JQuery',
      href: 'https://jquery.com/',
      icon: { dark: false, light: true },
      image: '/images/JQuery.svg',
    },
    {
      name: 'Linux',
      href: 'https://www.linux.org/',
      icon: { dark: false, light: true },
      image: '/images/Linux.svg',
    },
    {
      name: 'Python',
      href: 'https://www.python.org/',
      icon: { dark: false, light: true },
      image: '/images/Python.svg',
    },
    {
      name: 'Go',
      href: 'https://go.dev/',
      icon: { dark: false, light: true },
      image: '/images/Go.svg',
    },
    {
      name: 'Debian',
      href: 'https://www.debian.org/',
      icon: { dark: false, light: true },
      image: '/images/Debian.svg',
    },
    {
      name: 'Vim',
      href: 'https://www.vim.org/',
      icon: { dark: false, light: true },
      image: '/images/Vim.svg',
    },
    {
      name: 'Docker',
      href: 'https://www.docker.com/',
      icon: { dark: false, light: true },
      image: '/images/Docker.svg',
    },
    {
      name: 'Npm',
      href: 'https://www.npmjs.com/',
      icon: { dark: false, light: true },
      image: '/images/Npm.svg',
    },
    {
      name: 'Eslint',
      href: 'https://eslint.org/',
      icon: { dark: false, light: true },
      image: '/images/Eslint.svg',
    },
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      icon: { dark: false, light: true },
      image: '/images/Typescript.svg',
    },
    {
      name: 'Redis',
      href: 'https://redis.io/',
      icon: { dark: false, light: true },
      image: '/images/Redis.svg',
    },
    {
      name: 'MarkDown',
      href: 'https://www.markdownguide.org/',
      icon: { dark: false, light: true },
      image: '/images/MarkDown.svg',
    },
    {
      name: 'Git',
      href: 'https://git-scm.com/',
      icon: { dark: false, light: true },
      image: '/images/Git.svg',
    },
    {
      name: 'Vercel',
      href: 'https://vercel.com/',
      icon: { dark: false, light: true },
      image: '/images/Vercel.svg',
    },
    {
      name: 'Postgresql',
      href: 'https://www.postgresql.org/',
      icon: { dark: false, light: true },
      image: '/images/Postgresql.svg',
    },
    {
      name: 'Tailwindcss',
      href: 'https://tailwindcss.com/',
      icon: { dark: false, light: true },
      image: '/images/Tailwindcss.svg',
    },
    {
      name: 'Html5',
      href: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
      icon: { dark: false, light: true },
      image: '/images/Html5.svg',
    },
    {
      name: 'Ubuntu',
      href: 'https://ubuntu.com/',
      icon: { dark: false, light: true },
      image: '/images/Ubuntu.svg',
    },
    {
      name: 'Mongodb',
      href: 'https://www.mongodb.com/',
      icon: { dark: false, light: true },
      image: '/images/Mongodb.svg',
    },
    {
      name: 'NextJS',
      href: 'https://nextjs.org/',
      icon: { dark: false, light: true },
      image: '/images/NextJS.svg',
    },
    {
      name: 'VScode',
      href: 'https://code.visualstudio.com/',
      icon: { dark: false, light: true },
      image: '/images/VScode.svg',
    },
    {
      name: 'ArchLinux',
      href: 'https://archlinux.org/',
      icon: { dark: false, light: true },
      image: '/images/ArchLinux.svg',
    },
    {
      name: 'Sql',
      href: 'https://developer.mozilla.org/en-US/docs/Glossary/SQL',
      icon: { dark: false, light: true },
      image: '/images/Sql.svg',
    },
    {
      name: 'Shadcn',
      href: 'https://ui.shadcn.com/',
      icon: { dark: false, light: true },
      image: '/images/Shadcn.svg',
    },
    {
      name: 'NodeJS',
      href: 'https://nodejs.org',
      icon: { dark: false, light: true },
      image: '/images/NodeJS.svg',
    },
    {
      name: 'ReduxJS',
      href: 'https://redux.js.org/',
      icon: { dark: false, light: true },
      image: '/images/ReduxJS.svg',
    },
  ];

  return (
    <>
      {skills.map((skill, key) => (
        <TooltipWrapper key={key} text={skill.name} asChild>
          <ExternalLink
            href={skill.href}
            size="icon"
            variant="outline"
            className="relative"
          >
            <Suspense fallback={<Skeleton className="relative size-full" />}>
              {skill?.icon?.dark && skill?.icon?.light ? (
                <>
                  <Image
                    src={
                      skill.image
                        ? skill.image
                        : '/images/defaultCardPicture.png'
                    }
                    alt="/images/dark.svg"
                    width={16}
                    height={16}
                    className="absolute size-6 scale-100 transition-all dark:scale-0"
                  />
                  <Image
                    src={
                      skill.image
                        ? skill.image
                        : '/images/defaultCardPicture.png'
                    }
                    alt="/images/light.svg"
                    width={16}
                    height={16}
                    className="absolute size-6 scale-0 transition-all dark:scale-100"
                  />
                </>
              ) : (
                <>
                  {skill.icon?.dark || skill.icon?.light ? (
                    <Image
                      src={
                        skill.image
                          ? skill.image
                          : '/images/defaultCardPicture.png'
                      }
                      alt="/images/dark.svg"
                      width={16}
                      height={16}
                      className="absolute size-6 scale-100 transition-all"
                    />
                  ) : (
                    <>
                      <Image
                        src="/images/dark.svg"
                        alt="/images/dark.svg"
                        width={16}
                        height={16}
                        className="absolute size-6 scale-100 transition-all dark:scale-0"
                      />
                      <Image
                        src="/images/light.svg"
                        alt="/images/light.svg"
                        width={16}
                        height={16}
                        className="absolute size-6 scale-0 transition-all dark:scale-100"
                      />
                    </>
                  )}
                </>
              )}
            </Suspense>
          </ExternalLink>
        </TooltipWrapper>
      ))}
    </>
  );
};
