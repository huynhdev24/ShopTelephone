//======= imports =======//
import userApi from 'apis/userApi';
//======= constant action type =======//
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';

//======= actions request (call API) =======//
const getUserRequest = () => {
  return async (dispatch) => {
    try {
      const response = await userApi.getUser();
      const { name, email, _id, gender, address } = response.data
      dispatch(setUser({ name, email, _id, gender, address }))
    } catch (error) {
      throw error;
    }
  };
};

//======= actions =======//
const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

//======= initial state =======//
const initialState = {};

//======= reducer =======//
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...action.payload };
    }
    case SET_USER: {
      const state = {...action.payload} 
      return { ...state };
    }

    default:
      return { ...state };
  }
};

//======= exports =======//
export default {
  userReducer,
  getUserRequest,
  getUser,
  GET_USER,
};
