const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { whenProd } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Tối ưu parallel building
      webpackConfig.parallelism = 4;
      
      // Tối ưu cache
      webpackConfig.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };

      // Tối ưu cho production build
      whenProd(() => {
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
        };
      });

      return webpackConfig;
    },
  },
  // Tăng tốc độ development
  devServer: {
    hot: true,
    liveReload: false,
  },
}; 