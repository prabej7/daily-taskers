const getCurrentTime = () => {
  const time = new Date();
  const currentTime = time.toLocaleDateString();
  return currentTime;
};

export default getCurrentTime;
