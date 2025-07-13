import axios from 'axios';

import {
  SigninDataInterface,
  SigninPromiseInterface,
  SignupDataInterface,
  SignupPromiseInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const URL_AUTH = 'https://webdev-music-003b5b991590.herokuapp.com/user';

export function userSignin(
  signinData: SigninDataInterface,
): Promise<SigninPromiseInterface> {
  return axios.post(URL_AUTH + '/login', signinData).then((response) => {
    return response.data;
  });
}

export function userSignup(
  signupData: SignupDataInterface,
): Promise<SignupPromiseInterface> {
  return axios.post(URL_AUTH + '/signup', signupData).then((response) => {
    return response.data;
  });
}
