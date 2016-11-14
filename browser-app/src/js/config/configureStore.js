import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import throttle from 'lodash/throttle'

import { loadState, saveState } from './electronStorage'

import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const middleware = routerMiddleware(hashHistory)

const configureStore = function() {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f // Install DevTools
    )
  )

  store.subscribe( throttle(() => {
    saveState( store.getState() )
  }, 1000 ))

  return store
}

export default configureStore;
