module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  // devServer: {
    
  //   host: 'localhost'
  //   },

  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
};
