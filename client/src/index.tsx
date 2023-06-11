import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './state/store'
import { Provider } from 'react-redux'
import {createRoot} from  'react-dom/client'

const root = createRoot(document.getElementById('root')!);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
  );

