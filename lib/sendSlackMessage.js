const sendSlackMessage = async (user, order) => {
  try {
    const response = await fetch('/api/sendOrderToSlack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, order }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Failed to send Slack message: ${data.message}`);
    }

    return response.json();
  } catch (error) {
    console.error('An error occurred while sending the Slack message:', error);
    throw new Error('Failed to send the Slack message. Please try again!');
  }
};

export default sendSlackMessage;
