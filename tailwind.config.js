const config = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        primary: "#783EFD",
        "dark-primary": "#14082E",
        red: "#E85959",
        green: "#00DEA3",
        orange: "#F7931A",
        "negative-dark": "#CC0000",
        neutral: "#fafafa",
        "default-grey": "#343C44",
        "light-grey": "#EFF0F4",
        "medium-grey": "#667483",
        "light-light-grey": "#F7F8FA",
        "modal-background": "#000000BF",
        "grey-80": "#808080",
        "grey-secundary": "#DBDAF5",
        "medium-light-grey": "#D6E4EC",
        "purple-secundary": "#5A55D2",
        "circle-X": "#7F7F7F",
        "grey-label": "#686E72",
        "text-grey": "#9a9494",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      boxShadow: {
        primary: "0px 4px 16px rgba(90, 85, 210, 0.40)",
        card: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;"
      },
    },
  },
  plugins: [],
};
export default config;
