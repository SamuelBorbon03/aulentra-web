/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /**
   * Redirects 301.
   * · `/mi-espacio` (Sprint A · 2026-04-27): retirado definitivamente.
   * · `/recursos`   (Sprint C · 2026-04-28): despublicado · sin contenido editorial
   *   suficiente; reaparecerá si Narrative produce el material.
   */
  async redirects() {
    return [
      { source: "/mi-espacio",        destination: "/acceso", permanent: true },
      { source: "/mi-espacio/:path*", destination: "/acceso", permanent: true },
      { source: "/recursos",          destination: "/",       permanent: true },
      { source: "/recursos/:path*",   destination: "/",       permanent: true },
    ];
  },
};

export default nextConfig;
