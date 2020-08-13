const updateUserAuth = (token, user) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeUserAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export { updateUserAuth, removeUserAuth };
