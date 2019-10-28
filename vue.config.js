const path = require('path')
//配置中默认的选项已经除去,需要配置参考可参阅:https://cli.vuejs.org/zh/config/
module.exports = {
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    //eslint+prittier
    config.module.rule('eslint').use('eslint-loader').options({ fix: true })
  },
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'less',
      'patterns': [
        path.resolve(__dirname, 'src/assets/common/*.less'),
      ]
    }
  }
}