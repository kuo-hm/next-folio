import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: "Oussama's portoflio ",
  short_name: 'Portoflio ',
  description:
    'Hi! I am a full stack developer and hobbyist gamer based in Morocco! Interested to learn more? Check out my portfolio!',
  start_url: 'https://hmoura.com',
  icons: [
    {
      src: 'https://hmoura.com/images/siteImage.png',
      sizes: '709x288',
      type: 'image/png',
    },
  ],
});
export default manifest;
