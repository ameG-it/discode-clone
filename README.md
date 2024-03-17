# discode-clone

## 開発環境の起動

### モジュールのインストール
パッケージのモジュールをインストールしてください
```
npm install
```

### 認証キーの設定
.envファイルにFireBaseの認証情報を記入してください、

```
REACT_APP_APIKEY=your_parameter
REACT_APP_AUTHDOMAIN=your_parameter
REACT_APP_PROJECTID=your_parameter
REACT_APP_STORAGEBUCKET=your_parameter
REACT_APP_MESSAGINGSENDERID=your_parameter
REACT_APP_APPID=your_parameter
```

### 起動
ローカルで起動します。
```
npm start
```

## 詰まったところ

### dotenv
Reactでdotenvを使おうとしたところ、モジュールインストール済みにも関わらず\
インストールできていない旨のエラーが出た、\

どうも`react-scripts@0.2.3`以降はdotenvが標準で組み込まれているため\
インポートが不要になったようだった\
dotenvのインポートをやめてサーバ再起動したら正常に稼働した。\
また、ドキュメントにある通り`REACT_APP_`を接頭語にする必要があるようだった\

## コミットメッセージルール

- fix：バグ修正
- add：新規（ファイル）機能追加
- update：機能修正（バグではない）
- remove：削除（ファイル）

ex:
```
[fix] 画面が表示されなくなる不具合を修正
リダイレクト先の指定が正しくなかったため修正しました。
```