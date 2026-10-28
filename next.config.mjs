import path from "node:path";
import { fileURLToPath } from "node:url";
const nextConfig = {
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home.html", destination: "/", permanent: true },
      { source: "/home-full.html", destination: "/", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
};
export default nextConfig;
