import { defineConfig } from "cypress";
export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },

    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: "**/*.e2e.{js,jsx,ts,tsx}",
    },
});
