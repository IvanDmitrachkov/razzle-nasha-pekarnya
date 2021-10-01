const path = require('path')

module.exports = {
  plugins: [
    {
      name: 'scss',
      options: {
        sass: {
          prependData: '@import "styles/common/common";',
          data: '@import "styles/common/common";',
          additionalData: '@import "styles/common/common";',
          sourceMap: false,
          sassOptions: {
            prependData: '@import "styles/common/common";',
            additionalData: '@import "styles/common/common";',
            sourceMap: false,
            includePaths: [path.resolve(__dirname, 'src/')]
          },
          dev: {
            additionalData: '@import "styles/common/common";',
            sourceMap: false,
          },
          prod: {
            additionalData: '@import "styles/common/common";',
            sourceMap: false,
          }
        },
        sassOptions: {
          prependData: '@import "styles/common/common";',
          data: '@import "styles/common/common";',
          sourceMap: false,
          includePaths: [path.resolve(__dirname, 'src/')]
        },
        postcss: {
          dev: {
            sourceMap: false,
            includePaths: [path.resolve(__dirname, 'src/')]
          },
          prod: {
            includePaths: [path.resolve(__dirname, 'src/')]
          }
        }
      }
    },
    {
      name: 'eslint'
    }
  ]
}
