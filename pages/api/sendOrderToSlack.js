import { WebClient } from '@slack/web-api';

export default async function handler(req, res) {
  try {
    const { user, order } = req.body;

    const formatAdditionalContacts = () => {
      if (order.additionalContacts.length === 0) {
        return 'No contacts were added.';
      }

      const additionalContactsString = order.additionalContacts
        .map(contact => `- Name: ${contact.name}, Phone: ${contact.phone}`)
        .join('\n');

      return additionalContactsString;
    };

    const message = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Name:* \`${user.displayName}\` *Phone Number:* <tel:${user.phoneNumber}|${user.phoneNumber}>`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Email:* ${user.email}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Pickup Address:* \`${order.addresses.pickup.place_name}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Drop-Off Address:* \`${order.addresses.dropOff.place_name}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Payment Method:*\n\`\`\`${JSON.stringify(
              order.paymentMethod,
              null,
              2
            )}\`\`\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Service Type:* \`${order.serviceType}\`    *Vehicle Type:* \`${order.vehicleType}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Moving Date:* \`${order.movingDate}\`    *Moving Window:* \`${order.movingWindow}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Description:* \`${order.description}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Price:* \`${order.price}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Status:* \`${order.status}\``,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*Additional Contacts: ```' + formatAdditionalContacts() + '```*',
          },
        },
      ],
    };

    // Create a WebClient instance with your Slack API token
    const client = new WebClient(process.env.NEXT_PUBLIC_SLACK_API_TOKEN);

    // Send the message to Slack
    const result = await client.chat.postMessage({
      channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_NAME,
      blocks: message.blocks,
    });

    res.status(200).json({
      success: true,
      message: 'Slack message sent successfully',
      result,
    });
  } catch (error) {
    console.error('Error sending Slack message:', error);
    res.status(500).json({ success: false, error });
  }
}
