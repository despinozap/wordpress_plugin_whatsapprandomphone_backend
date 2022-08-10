module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "no-unused-vars": [
      "error", 
      { 
        "argsIgnorePattern": "next"  // For Express "next" on error handler
      }
    ] 
  }
}