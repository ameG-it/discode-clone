import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';


import { ErrorBoundary } from "react-error-boundary" ; //エラー詳細を出力するためのモジュール

// Firebaseの接続情報を環境変数から取得
import dotenv from 'dotenv';
dotenv.config();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    < ErrorBoundary  fallback = { <div>問題が発生しました</div>} >
    <Provider store={store}>
      <App />
    </Provider> 
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

