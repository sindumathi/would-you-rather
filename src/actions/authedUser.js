export const SET_AUTH_USER = 'SET_AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export function setAuthUser(user) {
  console.log(user);
  return {
    type: SET_AUTH_USER,
    user,
  };
}
export const logout = () => ({
  type: LOGOUT_USER,
});
