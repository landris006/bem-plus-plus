/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['hu'],
    defaultLocale: 'hu',
  },
};

module.exports = nextConfig;
