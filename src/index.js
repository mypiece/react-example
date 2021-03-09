import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from 'lib/redux';
import createSagaMiddleware from 'redux-saga';
import App from 'App';

const logger = createLogger(); //로거 생성
const sagaMiddleware = createSagaMiddleware();  //사가 미들웨어 생성

// 스토어 생성
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware)) //크롬 브라우저에 Redux DevTools 설치 필요
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
      <Provider store = {store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

