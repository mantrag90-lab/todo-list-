npm install -D tailwindcss postcss autoprefixer

npm install -D tailwindcss@3
npx tailwindcss init -p

Open tailwind.config.js

Replace content with:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


Go to:

src/index.css

Replace everything with:

@tailwind base;
@tailwind components;
@tailwind utilities;


npm install -D tailwind-merge clsx