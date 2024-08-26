const isExpiredToken = (token: any): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return token?.exp < currentTime;
};

export default isExpiredToken;
