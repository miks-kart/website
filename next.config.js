module.exports = {
  // i18n: {
  //   locales: ["en", "ru"],
  //   defaultLocale: "ru",
  // },
  staticPageGenerationTimeout: 240,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return config;
  },
};
