const path = require('path');

module.exports = {
    mode: "production",
  entry: './index.js',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, '../', 'popup', 'public'),
  },
};