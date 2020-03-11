const initialState = {
  username: '',
  password: '',
  ifFetching: '',
  status: false
}

export const types = {
  LOGIN_REQUEST: "LOGIN/LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN/LOGIN_SUCCESS",
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
  LOGOUT: 'LOGIN/LOGOUT',
  SET_USERNAME: 'LOGIN/SET_USERNAME',
  SET_PASSWORD: 'LOGIN/SET_PASSWORD'
};

/**
 * 对外暴露的actions
 */
export const actions = {
  login() {
    return (dispatch, getState) => {
      const { username, password } = getState().login
      if (!username.trim() || !password.trim()) {
        console.log("fff");
        
        return dispatch(loginFailure())
      }
      dispatch(loginRequest())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000);
      }).then(() => {dispatch(loginSuccess)})
    }
  },
  logout() {
      return {
      type: types.LOGOUT
    }
  },
  setUsername(username) {
    return {
      type: types.SET_USERNAME,
      username
    }
  },
  setPassword(password) {
    return {
      type: types.SET_PASSWORD,
      password
    }
  }
}

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
})

const loginFailure = () => ({
  type: types.LOGIN_FAILURE,
  error: '账号密码不能为空'
})

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isFetching: false, status: true };
    case types.LOGIN_FAILURE:
      return { ...state, isFetching: false, status: false };
    case types.LOGOUT:
      return { ...state, status: false, username: "", password: "" };
    case types.SET_USERNAME:
      return { ...state, username: action.username };
    case types.SET_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
}

// selectors
export const getUsername = state => {
  return state.login.username;
}

export const getPassword = state => {
  return state.login.password;
}

export const isLogin = state => {
  return state.login.status
}