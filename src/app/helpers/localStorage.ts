const updateUserAuth = (token, user) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const updateUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export { updateUserAuth, updateUser, removeUserAuth };
