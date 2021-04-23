// ---------------------------------------------------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// ---------------------------------------------------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// ---------------------------------------------------------------------------------------------------------------------
// webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// ---------------------------------------------------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベント処理のハンドリング
    req.body.events.forEach((event) => {
        if (event.type == "message" && event.message.type == "text"){
            if (event.message.text == "ガチホコ" || event.message.text == "がちほこ"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ボトルガイザーフォイル\nL3リールガンD\nバケットスロッシャー\nバケットスロッシャーソーダ\nノーチラス79"
                }));
            } else if (event.message.text == "ガチエリア" || event.message.text == "がちえりあ"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ロングブラスターネクロ\nスプラスコープコラボ\nバケットスロッシャーソーダ\nボトルガイザーフォイル\nH3リールガンD"
                }));
            } else if (event.message.text == "ガチヤグラ" || event.message.text == "がちやぐら") {
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ボトルガイザーフォイル\nカーボンローラーデコ\nRブラスターエリートデコ\nH3リールガンD\nノーチラス47"
                }));
            } else if (event.message.text == "ガチアサリ" || event.message.text == "がちあさり") {
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ボトルガイザーフォイル\nバケットスロッシャーソーダ\nH3リールガンD\nL3リールガン\nバケットスロッシャーデコ"
                }));
            } else {
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "ひらがな/カタカナでガチマッチのルールを入力してください。\n例：ガチエリア"
                }));
            }
        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});
