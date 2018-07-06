import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Dropdowns from './components/Dropdowns';
import reducer from './reducers'
import middleware from './middleware'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SubNotify from './components/SubNotify'

const store = createStore(reducer, middleware)
/*The following is where your React components will go*/
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('dropdown')
);
ReactDOM.render(    
    <SubNotify />,
    document.getElementById('sub-notify')
)

