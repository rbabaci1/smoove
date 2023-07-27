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

function getAvailableMovingWindows(movingDate) {
  // Get the current time
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

  // If selected movingDate is in the future, return the whole array
  if (selectedDate > currentTime) {
    return movingWindows;
  }

  // Get the current hour
  const currentHour = currentTime.getHours();

  // Check if current time is after 8pm or the movingDate is today but time is 9pm,
  // then return an empty array as all moving windows for today have passed.
  if (
    currentHour >= 20 ||
    (currentHour === 19 && selectedDate.getDate() === currentTime.getDate())
  ) {
    return [];
  }

  // Create an array to store the available time windows
  const timeWindows = [];
  let amPm = currentHour >= 12 || currentHour + 1 === 12 ? 'pm' : 'am';

  // Loop from the current hour until 9 pm (21 in 24-hour format)
  for (let hour = currentHour + 1; hour <= 21; hour++) {
    const nextHour = hour + 1;

    // Convert the hours to 12-hour format with AM/PM
    const startHour12 = hour === 12 ? 12 : hour % 12;
    const endHour12 = nextHour === 12 ? 12 : nextHour % 12;

    // Create the time window string in the format 'Xam - Ypm'
    const timeWindow = `${startHour12}${amPm} - ${endHour12}${amPm}`;

    // Push the time window to the array
    timeWindows.push(timeWindow);

    // If the next hour is 12 pm, break the loop (9 pm is the last window we need)
    if (nextHour === 21) break;

    // If the next hour exceeds 12, toggle AM/PM accordingly
    if (nextHour > 12) {
      amPm = 'pm';
    }
  }

  return timeWindows;
}

export default getAvailableMovingWindows;
