# discode-clone

## 開発環境の起動

### モジュールのインストール
パッケージのモジュールをインストールしてください
```
npm install
```

### 認証キーの設定
.envファイルにFireBaseの認証情報を記入してください、


## 詰まったところ

### dotenv
Reactでdotenvを使おうとしたところ、モジュールインストール済みにも関わらず\
インストールできていない旨のエラーが出た、\

どうも`react-scripts@0.2.3`以降はdotenvが標準で組み込まれているため\
インポートが不要になったようだった\
dotenvのインポートをやめてサーバ再起動したら正常に稼働した。\
また、ドキュメントにある通り`REACT_APP_`を接頭語にする必要があるようだった\