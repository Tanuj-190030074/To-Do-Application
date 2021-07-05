import { createStore,combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import loginReducer from '../reducers/loginReducer'
import usersReducer from '../reducers/usersReducer'
import todoReducer from '../reducers/todoReducer'
import filterReducer from '../reducers/filterReducer'
const reducer = combineReducers({
  notification:notificationReducer,
  user:loginReducer,
  users:usersReducer,
  todos:todoReducer,
  filter:filterReducer,
})
const store = createStore(reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    ))

export default store