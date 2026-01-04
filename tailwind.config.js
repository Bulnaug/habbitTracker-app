export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        danger: {
          DEFAULT: "#ef4444",
          hover: "#dc2626",
        },
      },
    },
  },
  plugins: [],
}
