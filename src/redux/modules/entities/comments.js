import createReducer from '../../../utils/createReducer'

const schema = {
  name: "comments",
  id: "id"
}

const types = {
  ADD_COMMENT: "COMMENTS/ADD_COMMENT"
}

export const actions = {
  addComment(comment) {
    return {
      type: types.ADD_COMMENT,
      comment
    }
  }
}

const normalReducer = createReducer(schema.name)

const reducer = (state = {}, action) => {
  if (action.type === types.ADD_COMMENT) {
    return { ...state, [action.comment.id]: action.comment }
  } else {
    return normalReducer(state, action)
  }
}

export default reducer;
