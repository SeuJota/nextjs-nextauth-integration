/* eslint-disable */
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './styles/antd.less',
  cssLoaderOptions: {
    esModule: false,
    sourceMap: false,
    modules: {
      mode: 'local',
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },

  // Other NextConfig Here...
  webpack(config) {
    return config;
  },

  // NextFuture
  future: {
    // webpack5: true,
  },
});
