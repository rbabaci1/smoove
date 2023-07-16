function getAvailableMovingWindows(movingDate) {
  const movingWindows = [
    '7am - 8am',
    '8am - 9am',
    '9am - 10am',
    '10am - 11am',
    '11am - 12pm',
    '12pm - 1pm',
    '1pm - 2pm',
    '2pm - 3pm',
    '3pm - 4pm',
    '4pm - 5pm',
    '5pm - 6pm',
    '6pm - 7pm',
    '7pm - 8pm',
    '8pm - 9pm',
  ];

  const currentTime = new Date();

  // Extract the day and month from the movingDate string
  const [, month, day] = movingDate.split(' ');

  // Parse the month abbreviation to get the month index (0-based)
  const monthIndex = new Date(`${month} 1, 2000`).getMonth();

  // Create a new Date object for the current year, month, and day
  const selectedDate = new Date(
    currentTime.getFullYear(),
    monthIndex,
    parseInt(day)
  );

  if (selectedDate > currentTime) {
    // If selected movingDate is in the future, return the whole array
    return movingWindows;
  }

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Calculate the minutes since midnight for the current time
  const currentMinutesSinceMidnight = currentHour * 60 + currentMinute;

  // Find the index of the first available moving window
  let startIndex = 0;
  for (let i = 0; i < movingWindows.length; i++) {
    const windowTime = movingWindows[i];
    const startHour = parseInt(windowTime.split('-')[0], 10);

    if (currentMinutesSinceMidnight <= startHour * 60) {
      startIndex = i;
      break;
    }
  }

  // Create a new array of moving windows starting from the first available window
  const availableMovingWindows = movingWindows.slice(startIndex);

  return availableMovingWindows;
}

export default getAvailableMovingWindows;
