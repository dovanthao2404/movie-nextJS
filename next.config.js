const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};