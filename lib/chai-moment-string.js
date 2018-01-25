(function (plugin) {
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = plugin;
  }
  else {
    if (typeof define === "function" && define.amd) {
      // AMD
      define(function () {
        return plugin;
      });
    }
    else {
      // Other environment (usually <script> tag): plug in to global chai instance directly.
      chai.use(plugin);
    }
  }
}(function (chai, utils) {
  const moment = require('moment');

  const Assertion = chai.Assertion;

  Assertion.addChainableMethod('momentFormat', function(expected, locale) {
    const localeMessage = locale ? ' with ' + locale : ''

    this.assert(
      moment(this._obj, expected, locale).isValid(),
      'expected #{this} to be #{exp}' + localeMessage,
      'expected #{this} to not be #{exp}' + localeMessage,
      expected
    );
  }, function() {
    Assertion.addMethod('strict', function(expected, locale) {
      const localeMessage = locale ? ' with ' + locale : ''
      const m = locale ? moment(this._obj, expected, locale, true) : moment(this._obj, expected, true)

      this.assert(
        m.isValid(),
        'expected #{this} to be strict #{exp}' + localeMessage,
        'expected #{this} to not be strict #{exp}' + localeMessage,
        expected
      );
    })
  });
}));
