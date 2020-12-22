import { api, cleanSession } from '.';

export const getMovies = async(dispatch) => {
  try {
    const { body } = await dispatch(api).get('api/movies');
    return body;
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const insertMovie = body => async(dispatch) => {
  try {
    const res = await dispatch(api).post(`api/movies`, {body});
    return res.body;
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const getMovie = id => async(dispatch) => {
  try {
    const { body } = await dispatch(api).get(`api/movies/${id}`);
    return body;
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const updateMovie = (id, body) => async(dispatch) => {
  try {
    const res = await dispatch(api).put(`api/movies/${id}`, {body});
    return res.body;
  } catch (error) {
    handleError(dispatch, error);
  }
};

export const deleteMovie = id => async(dispatch) => {
  try {
    const res = await dispatch(api).delete(`api/movies/${id}`);
    return res.body;
  } catch (error) {
    handleError(dispatch, error);
  }
};

function handleError(dispatch, error) {
  if (error.status === 401) {
    dispatch(cleanSession);
  } else {
    throw error;
  }
}
