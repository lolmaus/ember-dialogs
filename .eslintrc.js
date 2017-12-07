module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  plugins: [
    'ember'
  ],
  extends: [
    "eslint:recommended",
    'plugin:ember/recommended',
    "standard"
  ],
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "camelcase": "off",
    "comma-dangle": ["error", "always-multiline"],
    "func-call-spacing": "off",
    "generator-star-spacing": "off",
    "key-spacing": ["error", { beforeColon: true, afterColon: true, align: "colon" }],
    "new-cap": "off",
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-return-assign": "off",
    "no-sequences": "off",
    "no-template-curly-in-string": "off",
    "no-whitespace-before-property": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "quotes": "off",
    "quote-props": ["error", "as-needed"],
    "spaced-comment": "off",
    "standard/object-curly-even-spacing": "off",
  },
  overrides: [
    // node files
    {
      files: [
        'index.js',
        'blueprints/ember-dialogs/index.js',
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    },

    // test files
    {
      files: ['tests/**/*.js'],
      excludedFiles: [
        'tests/dummy/**/*.js',
        'tests/pages/**/*.js'
      ],
      env: {
        embertest: true
      },
      rules: {
        'no-unused-expressions' : 'off',
      }
    },
    {
      files: [
        'tests/dummy/**/*.js',
        'tests/pages/**/*.js'
      ],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
      },
    },
  ]
}
