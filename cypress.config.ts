import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'tests/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
  },
});
