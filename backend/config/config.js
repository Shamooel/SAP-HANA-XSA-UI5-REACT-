// Configuration for different environments
const config = {
    development: {
      port: process.env.PORT || 5000,
    },
    production: {
      port: process.env.PORT || 5000,
    },
  }
  
  // Determine which environment to use
  const env = process.env.NODE_ENV || "development"
  
  module.exports = config[env]
  
  