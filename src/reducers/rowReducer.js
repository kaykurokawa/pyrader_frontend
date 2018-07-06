import {
  ADD_ROW,
  REMOVE_ROW,
} from '../actions/rowActions'

export default function row(state = [], action){
  switch(action.type) {
      case ADD_ROW : 
          return state.concat(action.row)
      case REMOVE_ROW : 
          return state.filter((row) => row.id !== action.id)
  }
  return state
}
