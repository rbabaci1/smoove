import { WebClient } from '@slack/web-api';

export default async function handler(req, res) {
  try {
    const { user, order } = req.body;

    const formatAdditionalContacts = () => {
      if (order.additionalContacts.length === 0) {
        return 'No contacts were added.';
      }

      const additionalContactsString = order.additionalContacts
        .map(
          contact =>
            `Name: ${contact.name}, Phone Number: <tel:${contact.phoneNumber}|${contact.phoneNumber}>`
        )
        .join('\n');

      return additionalContactsString;
    };

    const message = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Name:* \`${user.displayName}\`\t*Phone Number:* <tel:${user.phoneNumber}|${user.phoneNumber}>`,
          },
          accessory: {
            type: 'button',
            action_id: 'completeOrder',
            text: {
              type: 'plain_text',
              text: 'Complete',
            },
            style: 'primary',
            confirm: {
              title: {
                type: 'plain_text',
                text: 'Confirmation',
              },
              text: {
                type: 'mrkdwn',
                text: 'Are you sure you want to mark this order as completed?',
              },
              confirm: {
                type: 'plain_text',
                text: 'Complete',
              },
              deny: {
                type: 'plain_text',
                text: 'Cancel',
              },
            },
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*User ID:*\`${user.uid}\` \t*Order ID:* \`${order.orderId}\``,
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
            text: `*Vehicle Type:* \`${order.vehicleType}\``,
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
            text: `*Description:* \`\`\`${order.description}\`\`\``,
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

    message.blocks.forEach(block => {
      if (block.accessory) {
        block.accessory.value = JSON.stringify({
          userID: user.uid,
          orderID: order.orderId,
        });
      }
    });

    // Create a WebClient instance with your Slack API token
    const client = new WebClient(process.env.NEXT_PUBLIC_SLACK_API_TOKEN);

    // Send the message to Slack
    const result = await client.chat.postMessage({
      channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_NAME,
      text: 'A new order has been received!',
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
