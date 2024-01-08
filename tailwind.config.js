const config = {
  content: [
    './src/**/*.{html,js,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'background': '#EFF3FD',
        'primary': '#783EFD',
        'dark-primary': '#14082E',
        'green': '#00DEA3',
        'red': '#E85959',
        'negative-dark': '#CC0000',
        'neutral': '#fafafa',
        'default-grey': '#343C44',
        'light-grey': '#EFF0F4',
        'light-light-grey': "#F7F8FA",
        'modal-background': '#000000BF'

      },
      fontFamily: {
        'poppins': 'Poppins, sans-serif'
      },
      boxShadow: {
        primary: '0px 4px 16px rgba(90, 85, 210, 0.40)',
      },
    },
  },
  plugins: [],
}
export default config