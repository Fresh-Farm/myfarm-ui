import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './fonts/Futura-Bold.ttf';
import './fonts/ProximaNova-Bold.ttf';
import './fonts/ProximaNova-Regular.ttf';
import './index.css';
import { persistor, store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
