// ライブラリのインポート
const express = require('express')
const mongodb = require('mongodb')

// アプリケーションの作成
const app = express()

// ルーティングの設定
app.get("/sample", (req, res) => {
    console.log("/sample is called.")
    res.send("Hello")
})

// サーバーの起動
app.listen(3000, () => {
    console.log("we are live on 3000")
})