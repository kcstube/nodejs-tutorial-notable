// ライブラリのインポート
const express = require('express')
const mongodb = require('mongodb')

// アプリケーションの作成
const app = express()

// メモを保存しておく変数
let memoList = [
    {
        "memo": "テスト",
        "sender": "テスト投稿者"
    }
]

// ルーティングの設定
// getリクエスト
app.get("/memos", (req, res) => {
    console.log("/memos (GET) is called.")
    let json = JSON.stringify(memoList)
    res.send(json)
})

// postリクエスト
app.post("/memos", (req, res) => {
    let memo = req.body.memo
    let sender = req.body.sender
    let newData = {
        "memo": memo,
        "sender": sender
    }
    console.log(newData)
    memoList.push(newData)
    res.send("メモを登録しました")
})

// サーバーの起動
app.listen(3000, () => {
    console.log("we are live on 3000")
})