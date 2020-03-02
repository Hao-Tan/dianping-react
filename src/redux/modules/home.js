const types = {
  //发送请求
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
  //请求成功
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
  //请求失败
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE'
}

export const actions = {
  loadLikes() {
    return (dispath, getState) => {

    }
  }
}

const actionCreators = {
  fetchLikesRequest() {
    return {
      type: types.FETCH_LIKES_REQUEST
    }
  },

  fetchLikesSuccess(data) {
    return {
      type: types.FETCH_LIKES_SUCCESS,
      data
    }
  },

  fetchLikesFailure(err) {
    return {
      type: types.FETCH_LIKES_FAILURE,
      err
    }
  }
}

const reducer = (state = {}, action ) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      //
    
    case types.FETCH_LIKES_SUCCESS:
      //
    
    case types.FETCH_LIKES_FAILURE:
      //
    
    default:
      return state
  }
}

export default reducer