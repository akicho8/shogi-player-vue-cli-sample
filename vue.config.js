var webpack = require("webpack");

module.exports = {
  // ▼shogi-player 側のクラス定数 "static xxx = 1" な表記が読み取れない問題
  // 原因は babel の node_modules 以下を除外しているから。
  // node_modules 以下であってもここで指定するとビルド対象になる
  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    "shogi-player",
  ],

  // ▼webpack5 で "Uncaught ReferenceError: process is not defined" になる問題
  // 4 まで必ず存在していた process が 5 から捨てられたため process を参照しているライブラリがことごとく失敗する
  // typedef process であらかじめチェックすりうように webpack には書いてあるがきりがない
  // 必ず存在する前提で process を参照しているため process を埋めた方がてっとり早い
  // この設定と合わせて yarn add process が必要
  // https://zenn.dev/szgk/articles/2d0843136d2fa8
  // https://webpack.js.org/migrate/5/#run-a-single-build-and-follow-advice
  // https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined
  // https://cli.vuejs.org/config/#configurewebpack
  // https://qiita.com/uturned0/items/5fdf2d92548274fe56e3
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  },
}
