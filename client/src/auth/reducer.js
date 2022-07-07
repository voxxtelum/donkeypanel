import React, { useReducer, useState } from 'react';

// get token, user from apollo cache
let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : '';

// initial state
export const initialState = {
  user: '' || user,
  token: '',
  loading: '',
  errorMessage: '',
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        loading: false,
        user: action.payload.user,
        token: action.payload.accessToken,
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
      };
    default:
      return {};
  }
};
