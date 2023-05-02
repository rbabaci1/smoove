const API_TOKEN = process.env.NEXT_PUBLIC_IP_INFO_API_TOKEN;

const getUserLocation = async () => {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${API_TOKEN}`);
    const data = await response.json();
    const { loc } = data;

    const [latitudeStr, longitudeStr] = loc.split(',');
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    return [longitude, latitude];
  } catch (error) {
    console.log(error);
  }
};

export default getUserLocation;
