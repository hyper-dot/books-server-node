require('tsconfig-paths').register({
  baseUrl: './', // Adjust the base URL according to your project structure
  paths: require('./tsconfig.json').compilerOptions.paths,
})
