module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // darkMode: 'class',
  // theme: {
  //   extend: {},
  // },
  // variants: {
  //   extend: {
  //     backgroundColor: ['dark'],
  //     textColor: ['dark'],
  //   },
  // },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [, 'dark',
      {
        pastel: {
          ...require("daisyui/src/theming/themes")["pastel"],
          neutral: "#ADD8E6",
          secondary: "#FFC0CB",
          gray: require("daisyui/src/theming/themes")["pastel"]["bg-neutral"]
        },
      },
    ],
    darkTheme: 'dark',
  }
}
