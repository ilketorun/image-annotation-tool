const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@hooks': 'src/hooks',
    '@utils': 'src/utils'
  })(config)

  return config
}