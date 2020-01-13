module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:mocha/recommended",
        "plugin:security/recommended",
        // "plugin:node/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "mocha",
        "security"
    ],
    "rules": {
        // "node/exports-style": ["error", "module.exports"],
        // "node/file-extension-in-import": ["error", "always"],
        // "node/prefer-global/buffer": ["error", "always"],
        // "node/prefer-global/console": ["error", "always"],
        // "node/prefer-global/process": ["error", "always"],
        // "node/prefer-global/url-search-params": ["error", "always"],
        // "node/prefer-global/url": ["error", "always"],
        // "node/prefer-promises/dns": "error",
        // "node/prefer-promises/fs": "error"
    }
};