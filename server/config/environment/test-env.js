/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  port: 9090,
  forceHttps: false,
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: true
      }
    }
  }
};
