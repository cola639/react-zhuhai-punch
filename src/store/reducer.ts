// third-party
import { combineReducers } from 'redux'

// project imports
import snackbarReducer from './slices/snackbar'
import menuReducer from './slices/menu'
import themeReducer from './slices/theme'
import punchReducer from './slices/punch'
import punch from './slices/punch'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: menuReducer,
  theme: themeReducer,
  punch: punchReducer
})

export default reducer
