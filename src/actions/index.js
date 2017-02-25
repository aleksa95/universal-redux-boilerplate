export default (user) => {
  console.log('YOU CLICKED ON USER', user.first);

  return {
    type: 'USER_SELECTED',
    payload: user,
  };
};

