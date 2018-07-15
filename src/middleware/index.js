import { applyMiddleware } from 'redux';
import logger from './logger'
import thunkMiddleware from 'redux-thunk'

  export default applyMiddleware(
    thunkMiddleware,  
    logger
  )