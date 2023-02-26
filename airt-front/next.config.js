/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "sanford-airt-bucket.s3.amazonaws.com",
      "sanford-airt-bucket.s3.sa-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
