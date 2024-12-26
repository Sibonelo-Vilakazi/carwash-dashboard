const { Configuration } = require('webpack');

module.exports ={
    // ... other webpack configurations
    resolve: {
      fallback: {
        "crypto": false
      }
    }
  };