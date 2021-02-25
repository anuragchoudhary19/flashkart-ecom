const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#fdb827',
              '@box-shadow-base': '0 0 0 2px rgb(255, 165, 0, 0.2)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
