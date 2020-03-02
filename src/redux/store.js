import { createStore, applyMiddlewares, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'

let store

if (process.env.NODE_ENV === 'production' && window.__REDUX_DEVTOOLS_EXTENTION__) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__;
  store = createStore(rootReducer, composeEnhancer, applyMiddlewares(thunk))
} else {
  store = createStore(rootReducer, applyMiddlewares(thunk));
}

export default store