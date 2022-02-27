import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';


// Create a custom hook to use the auth context

export const useAuth = () => {
  const { state, dispatch } = useContext(authContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux
// but they remain here for ease of students transitioning

// Load User
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR' });
  }
};

// Register User
/*export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};*/

// Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/v1/auth/login', formData);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err
    });
  }
};

// Logout
export const logout = async (dispatch) => {

  try{
   await axios.get('/api/v1/auth/logout');
  dispatch({ type: 'LOGOUT'});
  
 
  }catch(err) 
  {
    dispatch({
      payload:err.response.data.msg
    })
  }
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: 'CLEAR_ERRORS' });

// AuthState Provider Component

const AuthState = (props) => {
  const initialState = {
    
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // set token on initial app loading
  //setAuthToken(state.token);

  useEffect(() => {
    if (state.loading) {
      loadUser(dispatch);
    }
    
  });
  // load user on first run or refresh
  

  // 'watch' state.token and set headers and local storage on any change
  /*useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);*/

  return (
    <authContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;