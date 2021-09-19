module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@services': './src/services',
        '@utils': './src/utils',
        '@interfaces': './src/interfaces'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
