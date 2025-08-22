import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",              // Folder where your tests live
  fullyParallel: true,             // Run all tests in parallel
  retries: 1,                      // Retry failing tests once
  workers: "50%",                  // Use half the CPU cores (adjust if needed)
  timeout: 30 * 1000,              // 30s timeout per test
  use: {
    headless: true,                // Run in headless mode
    screenshot: "only-on-failure", // Capture screenshot on failure
    video: "retain-on-failure",    // Record video on failure
    trace: "on-first-retry"        // Collect trace on first retry
  },
  reporter: [["html", { open: "never" }]],

  // Define projects (browsers) to run against
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
