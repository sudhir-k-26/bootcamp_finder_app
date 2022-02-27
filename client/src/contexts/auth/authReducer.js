const authReducer = (state, action) => {
    switch (action.type) {
      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
        case 'LOGIN_SUCCESS':
            return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              loading: false
            };
      
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null
        };
      default:
        throw new Error(`Unsupported type of: ${action.type}`);
    }
  };
  
  export default authReducer;