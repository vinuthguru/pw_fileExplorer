// Utility to pick URL based on environment variable
export function getBaseUrl(): string {
  const env = process.env.TEST_ENV || "dev";
  const urls: Record<string, string> = {
    dev: "https://dev.fileexplorer.com",
    qa: "https://qa.fileexplorer.com",
    prod: "https://prod.fileexplorer.com",
  };
  return urls[env];
}