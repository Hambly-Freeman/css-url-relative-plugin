# css-url-relative-plugin

Credit to yibn2008 for the original library of which this is a fork.

Webpack plugin to convert css url(...) to relative path (supports Webpack 5 only).

This plugin aim to solve the problem that webpack generate incorrect relative path when your publicPath is empty (defaults to `''`) or `'./'`, it will replace incorrect path in css `url(...)`s with correct relative path at end of webpack compilation process.

For example:

```css
/*
 * /project
 * |- dist
 * |  |- xxx.hash.png
 * |  |- page
 * |     |- index.hash.css
 * |- src
 *    |- img
 *    |  |- xxx.png
 *    |- page
 *       |- index.css
 */
/* page/index.css (original css code you write) */
body {
  background: url(../img/xxx.png)
}

/* page/index.hash.css (webpack generated) */
body {
  /*
   * css-url-relative-plugin will generate: url(../xxx.hash.png)
   */
  background: url(xxx.hash.png)
}
```

As you can see, the image path in `url(...)` is relative to output dir, not the css file.

## Usage

```js
const CssUrlRelativePlugin = require('css-url-relative-plugin')

module.exports = {
  ...
  plugins: [
    new CssUrlRelativePlugin(/* options */)
  ]
}
```

## Options

### root

Like `root` option in [css-loader](https://webpack.js.org/loaders/css-loader/#root), it's the path to resolve URLs.


## LICENSE

MIT
