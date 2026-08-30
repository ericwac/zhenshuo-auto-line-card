/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'], // 如果使用外部圖片，請在此加入 domain
  },
}

module.exports = nextConfig
