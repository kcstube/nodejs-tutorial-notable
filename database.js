const mongodb = require("mongodb")
const { databaseURL } = require("./secret")
const MongoClient = mongodb.MongoClient

const collectionName = "memos"

let database

// データベースに接続
async function connect() {
    const client = await MongoClient.connect(databaseURL)
    database = client.db("myFirstDatabase")
}

// MongoDBにデータを新規作成する関数
// memo: メモの内容
// sender: メモの投稿者
// 返り値: true→成功, false→失敗
async function createNewMemo(memo, sender) {
    // database変数がmongodb.Dbという型であるかを検証する
    if (!(database instanceof mongodb.Db)) {
        return // 処理を終了する
    }
    const newData = {
        "memo": memo,
        "sender": sender
    }
    try {
        await database.collection(collectionName).insertOne(newData)
        return true
    } catch (err) {
        // エラーが発生した
        console.error(err)
        return false
    }
}

// 全てのメモを取得する関数
// 返り値: 全てのメモを格納した配列
async function getAllMemo() {
    // database変数がmongodb.Dbという型であるかを検証する
    if (!(database instanceof mongodb.Db)) {
        return // 処理を終了する
    }
    // 全てのデータを取得
    const allMemo = await database.collection(collectionName).find().toArray()
    return allMemo
}

module.exports = { connect, createNewMemo, getAllMemo }