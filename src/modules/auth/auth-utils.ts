export const existToken = () => {
  const token = sessionStorage.getItem('auth_token');
  return Boolean(token)
}