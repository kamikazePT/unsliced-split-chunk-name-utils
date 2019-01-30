# unsliced-split-chunk-name-utils
Function to use in the name prop of webpack's optimize split chunks, in order to have same behaviour of "name===true" without 100 char slice

## Instalation 

```
yarn add --dev unsliced-split-chunk-name-utils
```

## Use case

In case you want to use in combination with [kamikazept-chunks-2-json-webpack-plugin](https://github.com/kamikazePT/chunks-2-json-webpack-plugin).
It removes the 100 char cap, so the json built with [kamikazept-chunks-2-json-webpack-plugin](https://github.com/kamikazePT/chunks-2-json-webpack-plugin) will have the full chunk name as key.
Using this you can safely name the bundled files with [chunkhash]

## Usage example

#### Input

```javascript

const Chunks2JsonPlugin = require('kamikazept-chunks-2-json-webpack-plugin');
const splitChunksNameGenerator = require('unsliced-split-chunk-name-utils');
const path = require('path');
const projectPath = process.cwd();

const scriptPath = path.resolve(projectPath, 'js');
const stylePath = path.resolve(projectPath, 'css')

module.exports = {
  entry: {
    a : './path/to/my/entry/a.js',
    b : './path/to/my/entry/b.js'
  },
  output: {
    filename: '[chunkhash].bundle.js',
    path: scriptPath,
    publicPath : '/js/'
  },
  splitChunks: {
    name : splitChunksNameGenerator({ automaticNameDelimiter : '-' }),
    cacheGroups: {
      styles: {
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all'
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join(path.relative(scriptPath, stylePath), '[chunkhash].css'))
    }),
    new Chunks2JsonPlugin()
  ]
};

```

#### Output

```JSON
{
  "vendors-a-b" : {
    "js": ["/js/vendors-a-b.fc40697c.js"],
    "js.map": ["/js/vendors-a-b.fc40697c.js.map"]
  },
  "b": {
    "js": ["/js/b.fc40696c.js"],
    "js.map": ["/js/b.fc40696c.js.map"]
  },
  "a": {
    "css": ["/css/a.eb829ccc.css"],
    "js": ["/js/a.dd31cdcb.js"],
    "js.map": ["/js/a.dd31cdcb.js.map"]
  }
}
```

## Options

| Option | Description |
| ------------- |-------------|
| automaticNameDelimiter | Delimiter to separate chunk names |

## Questions? 

Feel free to open an issue. 