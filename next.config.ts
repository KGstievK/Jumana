import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "16.171.6.168",
      "vermojctkdkrdsxvauwc.supabase.co",
      "13.60.252.249",
      "lh3.googleusercontent.com",
      "13.60.252.249",
      "51.20.4.116",
      "51.20.4.116",
      '16.170.202.3'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '16.171.227.181',
        port: '', // Укажите порт, если он используется (например, '3000'). Оставьте пустым, если порт не нужен.
        pathname: '/media/**', // Убедитесь, что путь соответствует структуре URL изображений.
      },
    ],
  },
};

export default nextConfig;
