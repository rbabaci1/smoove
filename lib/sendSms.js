const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await fetch('/api/sendSms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Failed to send SMS: ${data.message}`);
    }

    // Additional code after successfully sending the SMS
  } catch (error) {
    // Handle the error based on your requirements
    console.error('An error occurred while sending the SMS:', error);

    // Throw a custom error or perform alternative actions
    throw new Error('Failed to send the SMS. Please try again!');
  }
};

export default sendSMS;
