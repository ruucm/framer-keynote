const font = {
  type1: "SF Pro Display",
  type2: "SF Pro Text"
};
const transitions = {
  short: {
    duration: 0.28
  },
  long: {
    duration: 0.36
  },
  test: {
    duration: 3
  }
};

export const themes = {
  light: {
    // Add colors directly, cause shared color from framer canvas make gatsby build error
    key: "light",
    color: {
      body: "#111",
      link: "#0070c9",
      background: "#FAFAFA",
      secondary: "#98989d",
      border: "rgb(216, 216, 216)"
    },
    font,
    breakpoint: {
      tablet: 1650,
      mobile: 1200
    },
    transitions
  },
  dark: {
    // Add colors directly, cause shared color from framer canvas make gatsby build error
    key: "dark",
    color: {
      body: "#111",
      link: "#0070c9",
      background: "#FAFAFA",
      secondary: "#98989d",
      border: "rgb(216, 216, 216)"
    },
    font,
    breakpoint: {
      tablet: 1650,
      mobile: 1200
    },
    transitions
  }
};
