// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  images: {
    unoptimized: true,
  },

  // basePath: '/projects/music',
  // assetPrefix: '/projects/music',

  // basePath: isProd ? '/projects/music' : '',
  // assetPrefix: isProd ? '/projects/music' : '',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/music',
        permanent: true,
      },
    ];
  },
};
