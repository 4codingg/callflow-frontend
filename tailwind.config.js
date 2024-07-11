/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#F8FAFC",
        primary: "#783EFD",
        "light-primary": "#DBDAF5",
        red: "#E85959",
        green: "#00DEA3",
        orange: "#F7931A",
        "negative-dark": "#CC0000",
        neutral: "#fafafa",
        "default-grey": "#71717A",
        "light-grey": "#F4F4F5",
        "medium-grey": "#667483",
        "light-light-grey": "#F7F8FA",
        "modal-background": "#000000BF",
        "grey-80": "#808080",
        "grey-secundary": "#DBDAF5",
        "medium-light-grey": "#D6E4EC",
        "purple-secundary": "#5A55D2",
        "circle-X": "#7F7F7F",
        "grey-label": "#686E72",
        muted: "##E4E4E7",
        "grey-five": "#555555",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#783EFD",
          foreground: "#783EFD",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      boxShadow: {
        primary: "0px 4px 16px rgba(90, 85, 210, 0.40)",
        card: "0 2px 2px 0 rgba(0, 0, 0, 0.10)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}