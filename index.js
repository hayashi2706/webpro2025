// Node.jsの標準ライブラリであるhttpモジュールをインポートする
import http from 'node:http';

// 環境変数でPORTが指定されていればそれを使う。なければ8888番ポートを使う。
const PORT = process.env.PORT || 8888;

// http.createServer() を使ってサーバーオブジェクトを作成する
// この関数は、リクエストがあるたびに実行されるコールバック関数を引数に取る
const server = http.createServer((req, res) => {
  // リクエストURLを、URLオブジェクトを使ってパースする
  // `req.url` にはパスとクエリ文字列が含まれる
  // `req.headers.host` にはホスト名が含まれる
  const url = new URL(req.url, `http://${req.headers.host}`);

  // URLのパス名を取得する
  const pathname = url.pathname;
  console.log(`[Log] Request for ${pathname} received.`);

  // レスポンスのヘッダーに、コンテンツの形式と文字コードを設定する
  // これにより、ブラウザはHTMLではなくプレーンなテキストとして解釈し、文字化けを防ぐ
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパス名に応じて処理を分岐する
  if (pathname === '/') {
    // ルートパス ("/") へのアクセス
    console.log('[Log] Responding for the root path.');
    // ステータスコード200 (成功) をヘッダーに書き込む
    res.writeHead(200);
    // レスポンスボディに "こんにちは！" と書き込んで送信を完了する
    res.end('こんにちは！');

  } else if (pathname === '/ask') {
    // "/ask" パスへのアクセス
    console.log('[Log] Responding for the /ask path.');
    // URLのクエリパラメータから 'q' の値を取得する
    const question = url.searchParams.get('q');
    res.writeHead(200);
    res.end(`Your question is '${question}'`);

  } else {
    // 上記以外のパスへのアクセス
    console.log(`[Log] Responding with 404 for ${pathname}.`);
    // ステータスコード404 (見つからない) をヘッダーに書き込む
    res.writeHead(404);
    res.end('ページが見つかりません');
  }
});

// 指定したポートでリクエストの待ち受けを開始する
server.listen(PORT, () => {
  console.log(`[Log] Server running at http://localhost:${PORT}/`);
});