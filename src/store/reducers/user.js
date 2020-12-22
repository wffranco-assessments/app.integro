import { handleLocal } from './_local';
import { api } from '../../api';
import { setToken } from './token';

// Reducer Actions
const SAVE = 'user/save';


const [ getLocal, setLocal ] = handleLocal('user');
const init = getLocal();

// Reducer
export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case SAVE: return setLocal(action.payload);
    default: return state;
  }
}

export const setUser = value => dispatch => dispatch({type: SAVE, payload: value});

const auth = url => body => async(dispatch) => {
  const response = await dispatch(api).post(url, { body });
  // console.log('success:', response);
  const { token, user } = response.body;
  dispatch(setToken(token));
  dispatch(setUser(user));
};

export const register = auth('auth/register');

export const login = auth('auth/login');

export const logout = async(dispatch) => {
  // await dispatch(api).post('auth/logout');
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const getAuthUser = d => d(async(dispatch, getState) => {
  const { token } = getState();
  if (!token) {
    dispatch(setUser(null));
    return;
  }
  try {
    const { body } = await dispatch(api).get('api/user');
    dispatch(setUser(body));
  } catch ({status}) {
    if (status === 401) {
      dispatch(setToken(null));
      dispatch(setUser(null));
    }
  }
});
