/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author yibn2008<yibn2008@qq.com>
*/

const { Compilation, sources: { RawSource } } = require('webpack');
const path = require('path');
const loaderUtils = require('loader-utils');
const cssReplace = require('./css-replace');

class CssUrlRelativePlugin {
  constructor(options) {
    this.options = options || {};
  }

  fixCssUrl(compilation, chunks, done) {
    const root = this.options.root;
    const assets = compilation.assets;
    const publicPath = compilation.options.output.publicPath || '';

    chunks.forEach((chunk) => {
      const input = [...chunk.files].filter((name) => /\.css$/.test(name));

      for (const name of input) {
        const asset = assets[name];
        const dirname = path.dirname(name);
        let source = asset.source();

        // replace url to relative
        source = cssReplace(source, refer => {
          // handle url(...)
          if (refer.type === 'url' && loaderUtils.isUrlRequest(refer.path, root)) {
            // remove publicPath parts
            let pathname = refer.path;
            if (publicPath && pathname.startsWith(publicPath)) {
              pathname = pathname.substring(publicPath.length);
            }

            // get relative path
            pathname = path.relative(dirname, pathname).replace(/\\/g, '/');

            return `url(${pathname})`;
          }

          // return original rule
          return refer.rule;
        });

        assets[name] = new RawSource(source);
      }
    });

    done();
  }

  apply(compiler) {
    const plugin = {
      name: 'CssUrlRelativePlugin'
    };

    // use compilation instead of this-compilation, just like other plugins do
    compiler.hooks.compilation.tap(plugin, (compilation) => {
      compilation.hooks.processAssets.tapAsync({
        name: 'ThemeMetaPlugin',
        stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
      }, (assets, done) => {
        this.fixCssUrl(compilation, compilation.chunks, done);
      });
    });
  }
}

module.exports = CssUrlRelativePlugin;
