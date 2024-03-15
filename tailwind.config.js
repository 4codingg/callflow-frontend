const config = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#F8FAFC",
        "primary": "#783EFD",
        "red": "#E85959",
        "green": "#00DEA3",
        "orange": "#F7931A",
        "negative-dark": "#CC0000",
        "neutral": "#fafafa",
        "default-grey": "#71717A",
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
        "muted": "##E4E4E7",
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      boxShadow: {
        primary: "0px 4px 16px rgba(90, 85, 210, 0.40)",
        card: "0 2px 2px 0 rgba(0, 0, 0, 0.10)"
      },
    },
  },
  plugins: [],
};
export default config;
