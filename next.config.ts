import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚙️ Fix para dependencias de Node que no existen en el cliente
  webpack: (config) => {
    if (!config.externals) config.externals = [];
    if (Array.isArray(config.externals)) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }
    return config;
  },

  // 🚫 Ignorar ESLint en build (necesario para Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🚫 Ignorar errores de TypeScript en build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
