// ライブラリのインポート
const express = require('express')
const mongodb = require('mongodb')
const { connect, createNewMemo, getAllMemo } = require('./database')

// アプリケーションの作成
const app = express()

// POSTリクエストのJSONを受け取るために必要なコード
app.use(express.json())

// ルーティングの設定
// getリクエスト
app.get("/memos", async (req, res) => {
    let allMemo
    try {
        allMemo = await getAllMemo()
    } catch (err) {
        console.error(err)
        allMemo = []
    }
    let response = JSON.stringify(allMemo)
    res.send(response)
})

// postリクエスト
app.post("/memos", async (req, res) => {
    const memo = req.body.memo
    const sender = req.body.sender
    const isSuccess = await createNewMemo(memo, sender)
    if (isSuccess) {
        res.send("新しくメモを登録しました")
    } else {
        res.send("新しくメモを登録できませんでした")
    }
})

// サーバーの起動
app.listen(3000, () => {
    console.log("we are live on 3000")
})

// データベースに接続
connect().catch((err) => console.error(err))