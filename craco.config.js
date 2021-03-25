const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#023047',          
              '@box-shadow-base': '0 0 0 2px rgb(0, 0, 0, 0.5)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
