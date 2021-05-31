module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080/api",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  outputDir: "../public",
};
