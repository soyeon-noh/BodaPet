// 최적화 : 파일 크기 최소화
// export const purge = ["./src/**/*.{js,jsx,ts,tsx}"];
// export const content = [];
// export const theme = {
//   extend: {
//     colors: {
//       // gray: colors.coolGray,
//     },
//     fontFamily: {
//       jalnan: ["Jalnan"],
//       sans: ["Graphik", "sans-serif"],
//     },
//   },
// };
// export const plugins = [];

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      colors: {
        main: "#EAF7FF",
      },
      fontFamily: {
        jalnan: ["yg-jalnan"],
        noto: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
