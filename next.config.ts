import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚙️ Reglas para webpack (si las necesitas)
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // 🚫 Ignorar ESLint en build (para Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🚫 Ignorar errores de TypeScript en build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
