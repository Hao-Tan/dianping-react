import { combineReducers } from "redux"
import app from './app'
import detail from './detail'
import home from './home'
import search from './search'
import login from "./login";
import entities from './entities'

const rootReducer = combineReducers({
  app,
  detail,
  home,
  entities,
  search,
  login
})

export default rootReducer