import { applyMiddleware } from "../../../../../.cache/typescript/2.8/node_modules/redux";
import logger from './logger'
import thunkMiddleware from 'redux-thunk'

  export default applyMiddleware(
    thunkMiddleware,  
    logger
  )