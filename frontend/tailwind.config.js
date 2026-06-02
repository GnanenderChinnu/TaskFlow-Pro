export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#111827",
        mist: "#eef2f7",
        brand: {
          50: "#eff6ff",
          500: "#2563eb",
          600: "#1d4ed8"
        }
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
