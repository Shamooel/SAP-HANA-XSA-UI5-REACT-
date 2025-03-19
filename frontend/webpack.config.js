const path = require("path")

module.exports = {
  // Other webpack configuration...
  resolve: {
    fallback: {
      path: false,
      fs: false,
      crypto: false,
      http: false,
      zlib: false,
      querystring: false,
      stream: false,
      buffer: false,
      url: false,
      util: false,
      net: false,
    },
  },
}

