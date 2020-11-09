// cookie
import Cookies from 'js-cookie'

const TokenKey = 'token';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(value) {
  return Cookies.set('userInfo', value)
}

export function getUserInfo() {
  let userInfo = Cookies.get('userInfo')||'{}';
  return JSON.parse(userInfo)||{}
}

export function removeUserInfo() {
  return Cookies.remove('userInfo')
}

export function removeAllcookie() {
  Cookies.remove(TokenKey);
  Cookies.remove('userInfo');
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function removeCookie(name) {
  Cookies.remove(name);
}

export function setCookie(name, val) {
  Cookies.set(name, val, { expires: 7, path: '/' });
}
