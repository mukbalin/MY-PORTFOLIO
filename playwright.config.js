const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://127.0.0.1:3107", channel: "chrome" },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3107",
    url: "http://127.0.0.1:3107",
    reuseExistingServer: false,
  },
  reporter: "list",
});
