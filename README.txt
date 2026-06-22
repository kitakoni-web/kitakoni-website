北沢小西ブランドサイト v22

ロゴオープニング：巨大ロゴが画面上部ナビゲーションのロゴ位置へ、スムースに縮小して収まります。
1日1回表示。確認時は index.html?intro=1 を使ってください。

北沢小西 ブランドサイト v17 / Version 1.0 / v24
================================

コンセプト
--------------------------------
下北沢 × クラフトビール × 少しだけ銀河

「下北沢 × クラフトビール × 少しだけ銀河」をテーマにしたブランドサイトです。
基地・補給基地系の文言は使っていません。
英語はJP/EN切替時だけ表示されます。
初回表示のみ、ロゴが大きく現れて適正サイズへ戻るブランドイントロが入ります。同じブラウザでは1日1回だけ表示されます。

アップロード方法
--------------------------------
このフォルダ内のファイルを、サーバーの公開フォルダへそのままアップロードしてください。

主なファイル
--------------------------------
index.html              ホームページ本体
css/style.css           デザイン
js/main.js              動き・言語切替・news.json読み込み
news.json               お知らせデータ
news-editor.html        お知らせ作成ツール
images/                 画像フォルダ
robots.txt              検索エンジン用
sitemap.xml             サイトマップ
favicon関連             ブラウザアイコン

普段の更新方法
--------------------------------
1. Instagramを更新する
   新入荷・イベント・営業案内はInstagramに投稿してください。
   ホームページ内のInstagramセクションから誘導されます。

2. お知らせだけ更新する場合
   news.json を更新します。
   HTMLは触りません。

お知らせの更新方法
--------------------------------
かんたんな方法：
1. news-editor.html をブラウザで開く
2. 日付と文章を入力
3. 「追加」を押す
4. 「JSONをコピー」を押す
5. サーバー上の news.json の中身を貼り替える

news.json の例：
[
  {
    "date": "2026.06.21",
    "text": "営業時間を更新しました。"
  },
  {
    "date": "2026.06.20",
    "text": "新入荷情報はInstagramをご確認ください。"
  }
]

画像差し替え
--------------------------------
写真を差し替える場合は、同じファイル名で images フォルダに上書きしてください。

推奨画像名：
images/hero_shop.jpg          トップ画像
images/shop_night.jpg         アクセス背景画像

SVGの仮画像も入っています。jpgがある場合はjpgが優先表示されます。

Instagram自動表示について
--------------------------------
完全な自動表示にはInstagram公式APIまたは外部ウィジェットサービスが必要です。
現時点では、安全に使える「Instagramへ誘導する設計」にしています。
外部ウィジェットを導入する場合は、Instagramセクションの指定位置に埋め込みコードを入れられます。

注意
--------------------------------
アップロード前に、現在のホームページのバックアップを必ず取ってください。

----------------------------------------
デバッグ用：オープニングをもう一度見る方法
----------------------------------------
通常は1日1回だけオープニングが表示されます。
確認したい場合は、URLの最後に ?intro=1 を付けてください。

例：
https://kitazawakonishi.com/?intro=1

開発用ボタンを出したい場合は、URLの最後に ?dev=1 を付けてください。
右下に以下のボタンが表示されます。

- INTRO：オープニングを再生
- CLEAR SEEN：本日の表示済み記録を削除
- REGEN STARS：星空を再生成
- JP / EN：言語切替

公開時に ?dev=1 を付けなければ、ボタンは表示されません。


Version 1.0 / v24 / v19
- Opening: oversized logo holds for 0.2s, smoothly shrinks to the final size, then stops.
- The previous “shrink then enlarge” motion has been removed.
- Debug: open index.html?intro=1 to replay, index.html?dev=1 to show the developer panel.


Version 1.0 / v24 FINAL opening notes:
- Opening appears once per day.
- Add ?intro=1 to the URL to replay it for checking.
- Add ?dev=1 to show debug buttons.
- Logo starts large, holds briefly, then slowly settles into the navigation logo position.
- During the logo movement, the hero photo fades in softly behind it.


[v24修正]
オープニング縮小中の背景写真が表示されない原因になっていた hero_shop.jpg 参照を外し、同梱の hero_shop.svg を必ず表示するよう修正しました。実写真に差し替える場合は images/hero_shop.svg を同名で置き換えるか、HTML内の画像パスを変更してください。


【v25変更】
オープニングのロゴ縮小スピードをv24より少し早く調整しました。背景写真のフェード表示は維持しています。
確認：index.html?intro=1


Version 1.0 Final
- Opening: centered logo shrink + HERO photo fade-in.
- HERO image: images/hero_shutter.jpg
- Check opening: index.html?intro=1
