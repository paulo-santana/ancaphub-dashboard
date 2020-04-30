import { Types } from "../actions/auth";

const INITIAL_STATE = {
  user: {},
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  errorMessage: "",
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Types.AUTH_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case Types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case Types.LOGOUT:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        token: null,
      };
    case Types.AUTH_ERROR:
    case Types.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};
