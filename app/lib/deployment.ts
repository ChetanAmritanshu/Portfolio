function normalizeBasePath(value: string | undefined): string {
  if (!value || value === "/") return "";
  const normalized = `/${value.replace(/^\/+|\/+$/g, "")}`;
  if (normalized.includes("..")) {
    throw new Error("BASE_PATH must be a safe URL path.");
  }
  return normalized;
}

const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH,
);

export const deployment = {
  basePath,
  basePathWithSlash: basePath ? `${basePath}/` : "/",
  siteUrl: process.env.SITE_URL ?? "https://example.com",
} as const;

export function assetUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${deployment.basePathWithSlash}${cleanPath}`;
}
