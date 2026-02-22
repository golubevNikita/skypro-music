module.exports = {
  images: {
    unoptimized: true,
  },

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
