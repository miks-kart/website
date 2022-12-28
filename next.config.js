module.exports = {
  // i18n: {
  //   locales: ["en", "ru"],
  //   defaultLocale: "ru",
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return config;
  },
};
