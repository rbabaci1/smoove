const postOrderToOnFleet = async order => {
  const apiKey = process.env.NEXT_PUBLIC_ONFLEET_API_KEY;

  try {
    const response = await fetch('https://onfleet.com/api/v2/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Order submitted to Onfleet:', responseData);
      // You can perform additional actions or show a success message to the user
    } else {
      console.error('Error submitting order to Onfleet:', response.statusText);
      // Handle the error or display an error message to the user
    }
  } catch (error) {
    console.error('Error submitting order to Onfleet:', error);
    // Handle any exceptions that occur during the API request
  }
};

export default postOrderToOnFleet;
