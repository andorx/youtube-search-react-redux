var babel = require('babel-core/register');

function noop() {
  return null;
}

require.extensions['.css'] = noop;
