import type { NextConfig } from "next";

import { deployment } from "./app/lib/deployment";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath: deployment.basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: deployment.basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
