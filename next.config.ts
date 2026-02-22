module.exports = {
  images: {
    unoptimized: true,
  },

  basePath: '/projects/music',

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
