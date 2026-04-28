/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /**
   * Redirects 301 — Sprint A · 2026-04-27.
   * `/mi-espacio` queda retirado definitivamente; cualquier acceso debe
   * volver al flujo de acceso público de Aulentra.
   */
  async redirects() {
    return [
      { source: "/mi-espacio",        destination: "/acceso", permanent: true },
      { source: "/mi-espacio/:path*", destination: "/acceso", permanent: true },
    ];
  },
};

export default nextConfig;
