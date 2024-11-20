import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["var(--font-prompt)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        gray: "var(--gray)",
      },
      boxShadow: {
        "custom-md": `
          var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000),
          0 0px 6px -1px rgb(0 0 0 / 0.1), 
          0 2px 4px -2px rgb(0 0 0 / 0.1)
        `,
      },
    },
  },
  plugins: [],
};
export default config;
