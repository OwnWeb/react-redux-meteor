import { combineReducers } from 'redux'
import unique from 'lodash/uniq'

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { response: { doc } } = action
    const { completed, id } = doc
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    )
    return shouldRemove
      ? state.filter(t => t.id !== id)
      : state
  }

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'DDP_ADDED':
        return filter !== 'completed' ?
          unique([...state, action.response.doc.id])
          : state
      case 'DDP_REMOVED':
        return state.filter(id => id !== action.response.id)
      case 'DDP_CHANGED':
        return handleToggle(state, action)
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILIURE':
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILIURE':
        return action.message
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  })
}

export default createList

export const getIds = (state) => state.ids
export const getIsFetching = (state) => state.isFetching
export const getErrorMessage = (state) => state.errorMessage
