const TerserPlugin = require('terser-webpack-plugin');
const { whenProd } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Optimize parallel building
      webpackConfig.parallelism = 4;

      // Optimize cache
      webpackConfig.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };

      // Optimize for production build
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
  // Increase development speed
  devServer: {
    hot: true,
    liveReload: false,
  },
}; 