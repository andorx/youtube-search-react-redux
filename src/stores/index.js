import thunkMiddleWare from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

export default function() {
  return createStore(
    reducers,
    // Using applyMiddleare to apply redux-thunk, that support for async actions
    applyMiddleware(
      thunkMiddleWare
    )
  );
}
