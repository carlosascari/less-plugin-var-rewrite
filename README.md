# less-plugin-var-rewrite

Rewrite css variable declarations.

### Install

```
npm i less-plugin-var-rewrite --save
```

## Programmatic usage

```js
var LessPluginVarRewrite = require('less-plugin-var-rewrite');

var varRewritePlugin = new LessPluginVarRewrite({
  prefix: '{{ settings.',
  postfix: ' }}'
});

less.render(lessString, { plugins: [ varRewritePlugin ] })
.then(...)
```

### Default Options

```
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
    return `var(--${variableName})`;
  },
  blacklist: [],
  whitelist: [],
  prefix: '',
  postfix: '',
  underscore: true,
  underscoreReg: /-/g,
};
```

## Use Case

I needed to replace css variables with [liquid](https://github.com/Shopify/liquid) variables.

This allowed me to develop a shopify theme and afterwards define the theme configuration. 

*before*

```
body {
  background: var(--light-grey-03);
  height: 100%;
}
```

*after*

```
body {
  background: {{ settings.light_grey_03 }};
  height: 100%;
}
```

## License

MIT