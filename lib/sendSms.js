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
  } catch (error) {
    console.error('An error occurred while sending the SMS:', error);

    throw new Error('Failed to send the SMS. Please try again!');
  }
};

export default sendSMS;
