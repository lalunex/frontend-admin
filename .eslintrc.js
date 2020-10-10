module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": 0,
    'semi': 0,    // 分号
    "new-cap": [2, { "newIsCap": false, "capIsNew": false }],  // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],   // script缩进
    'no-trailing-spaces': ["error", { "skipBlankLines": true }]   // 空行的空格
  },
  overrides:[     // script缩进
    {
      'files':['*.vue'],
      'rules':{
        'indent':'off'
      }
    }
  ]
}

