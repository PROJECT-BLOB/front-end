const cspHeader = `
    upgrade-insecure-requests;
`



/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Content-Security-Policy',
//             value: cspHeader.replace(/\n/g, ''),
//           },
//         ],
//       },
//     ]
//   },
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /component/ },
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /component/,
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  // TODO: 개발 끝나면, 나중에 remote 이미지 제한시켜야 함!!
  images: {
    remotePatterns: [
      // 외부 이미지 일단 다 풀어둠.
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
