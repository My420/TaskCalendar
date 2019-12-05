const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'entry',
      corejs: '3'
      // debug: true
    }
  ]
];

module.exports = { presets };
