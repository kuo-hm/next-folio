/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'About my project';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

const og = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data = [
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
          href: '',
          start_time: '',
          icon: {
            dark: true,
            light: false,
          },
        },
      ],
      timeframe: {
        start: new Date('2023-01-01').toISOString(),
        end: new Date('2023-06-30').toISOString(),
      },
    },
  ];

  if (!data.length) return;
  const fetched = data[0];

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0,
            display: 'flex',
          }}
        >
          {fetched.images?.image ? (
            <img src={'/images/defaultCardPicture.png'} alt={fetched.title} />
          ) : (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/siteImage.png`}
              alt={fetched.title}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',

            color: 'rgb(250,250,250)',
            textShadow: '0 0 20px rgb(0,0,0)',
            backdropFilter: 'blur(50px)',
            background: 'rgba(0,0,0,0.7)',

            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Title */}
          <h1
            style={{ fontSize: '5rem', fontWeight: 700, textAlign: 'center' }}
          >
            {fetched.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              marginTop: '1.5rem',
              fontWeight: 400,
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {fetched.description.short}
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
};
export default og;
