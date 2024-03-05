/** @type {import('next').NextConfig} */

const imageURLs = [
  { hostname: 'www.w3.org', pathname: '/2000/**' },
  {
    hostname: 'oaidalleapiprodscus.blob.core.windows.net',
    pathname: '/**',
  },
];

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/products/:id',
        destination: '/items/:id',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: imageURLs.map(
      ({ hostname, pathname = '/**', protocol = 'https' }) => ({
        protocol,
        hostname,
        port: '',
        pathname,
      }),
    ),
  },
};

module.exports = nextConfig;
