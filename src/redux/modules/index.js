import { combineReducers } from "redux"
import app from './app'
import detail from './detail'
import home from './home'
import entities from './entities'

const rootReducer = combineReducers({
  app,
  detail,
  home,
  entities
})

export default rootReducer