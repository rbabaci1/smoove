const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          resolve([longitude, latitude]);
        },
        error => {
          reject(`Geolocation error: ${error.message}`);
        }
      );
    }
  });
};

export default getUserLocation;
