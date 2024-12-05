module.exports = {
    env: {
      browser: true,
      node: true,
      serviceworker: true
    },
    rules: {
      'no-restricted-globals': ['error', 'event', 'fdescribe']
    }
  };