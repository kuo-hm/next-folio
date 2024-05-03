'use client';

import * as React from 'react';

import { Separator } from '@components/ui/separator';
import { TooltipWrapper } from '@components/ui/tooltip';
import { InternalLink } from '@components/ui/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const NotFoundError = () => (
  <div
    className="mt-16 flex min-h-screen min-w-full max-w-full flex-col"
    style={{ minHeight: 'calc(100vh - 64px)' }}
  >
    {/* Error Message */}
    <div className="flex grow flex-col items-center justify-center">
      {/* Error Code */}
      <div className="mb-10 flex flex-row items-center">
        <h1 className="text-5xl font-bold">404</h1>
        <Separator className="mx-4" orientation="vertical" />
        <p className="text-2xl">Page not found</p>
      </div>

      {/* Text */}
      <p className="text-lg">Sorry, we couldn&apos;t find this page.</p>

      {/* Link */}
      <TooltipWrapper text="Go back home!" asChild>
        <InternalLink href="/" variant="outline" className="my-4">
          Go back home
        </InternalLink>
      </TooltipWrapper>
    </div>

    {/* Report */}
    <div className="mb-8 flex size-fit flex-col items-center gap-4 self-center sm:mr-[2.5%] sm:self-end">
      <TooltipWrapper text="Report an issue!" asChild>
        <InternalLink variant="outline" href="/contact">
          Report an issue
          <ArrowTopRightIcon className="ml-2" />
        </InternalLink>
      </TooltipWrapper>
    </div>
  </div>
);
export default NotFoundError;
