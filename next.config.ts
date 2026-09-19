import type { NextConfig } from "next";

import { deployment } from "./app/lib/deployment";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath: deployment.basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
