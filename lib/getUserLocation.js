const getLocationFromIpInfo = async () => {
  const response = await fetch(
    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_TOKEN}`
  );
  const data = await response.json();
  const { loc } = data;

  const [latitudeString, longitudeString] = loc.split(',');
  const latitude = parseFloat(latitudeString);
  const longitude = parseFloat(longitudeString);

  return { longitude, latitude };
};

const getUserLocation = async () => {
  let location;

  try {
    location = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { longitude, latitude } = position.coords;

            resolve({ longitude, latitude });
          },
          error => {
            reject(`Geolocation error: ${error.message}`);
          }
        );
      } else {
        reject('Geolocation is not supported by your browser');
      }
    });
  } catch (err) {
    console.log(err);
    location = await getLocationFromIpInfo();
  }

  return location;
};

export default getUserLocation;
