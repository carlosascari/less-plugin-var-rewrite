
var REG = /var\(--(.*?)\)/gi;

var DEFAULT_OPTIONS = {
  rewrite: function (variableName) {
    if (this.blacklist.indexOf(variableName) === -1) {
      if (!this.whitelist.length || this.whitelist.indexOf(variableName) !== -1) {
        if (this.underscore) {
          variableName = variableName.replace(this.underscoreReg, '_');
          return `${this.prefix}${variableName}${this.postfix}`;
        }
      }
    }
  },
  blacklist: [],
  whitelist: [],
  prefix: '',
  postfix: '',
  underscore: true,
  underscoreReg: /-/g,
};

/**
* Plugin
*/

function LessPluginTranscend(options) {
  this.options = parseOptions(options);
};

LessPluginTranscend.prototype = {
  install: function(less, pluginManager) {
    var TranscendProcessor = getTranscendProcessor(less);
    pluginManager.addPostProcessor(new TranscendProcessor(this.options));
  },
  printUsage: function () {
    process.write(`Usage: todo\n`);
  },
  setOptions: function(options) {
    this.options = parseOptions(options);
  },
  minVersion: [2, 0, 0]
};

function parseOptions(options) {
  return {
    rewrite: options.rewrite || DEFAULT_OPTIONS.rewrite,
    blacklist: options.blacklist || DEFAULT_OPTIONS.blacklist,
    whitelist: options.whitelist || DEFAULT_OPTIONS.whitelist,
    prefix: options.prefix || DEFAULT_OPTIONS.prefix,
    postfix: options.postfix || DEFAULT_OPTIONS.postfix,
    underscore: options.underscore || DEFAULT_OPTIONS.underscore,
    underscoreReg: options.underscoreReg || DEFAULT_OPTIONS.underscoreReg,
  };
}

function getTranscendProcessor(less) {
  function TranscendProcessor(options) {
    this.options = options || {};
  };
  TranscendProcessor.prototype = {
    process: function (css, extra) {
      const rewrite = this.options.rewrite.bind(this.options);
      return css.replace(REG, function(match, varName) {
        return rewrite(varName);
      });
    }
  };
  return TranscendProcessor;
}

module.exports = LessPluginTranscend;