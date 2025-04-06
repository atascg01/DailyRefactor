import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1f2937', // text-gray-800
            a: {
              color: '#2563eb', // text-blue-600
              '&:hover': {
                color: '#1d4ed8', // text-blue-700
              },
            },
            h1: {
              color: '#111827', // text-gray-900
            },
            h2: {
              color: '#111827', // text-gray-900
            },
            h3: {
              color: '#111827', // text-gray-900
            },
            h4: {
              color: '#111827', // text-gray-900
            },
            strong: {
              color: '#111827', // text-gray-900
            },
            code: {
              color: '#111827', // text-gray-900
              backgroundColor: '#f3f4f6', // bg-gray-100
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            pre: {
              backgroundColor: '#1f2937', // bg-gray-800
              color: '#f9fafb', // text-gray-50
            },
            blockquote: {
              color: '#4b5563', // text-gray-600
              borderLeftColor: '#d1d5db', // border-gray-300
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config; 