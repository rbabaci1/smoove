import { WebClient } from '@slack/web-api';

// Create a new instance of the WebClient with your Slack token
const client = new WebClient(process.env.NEXT_PUBLIC_SLACK_API_TOKEN);

export default async function handler(req, res) {
  const payload = JSON.parse(req.body.payload);

  const action = payload.actions[0];
  const value = action.value;

  // Check if the value is present
  if (value) {
    const updatedButtonText = 'Job Completed ✅';

    // Find the block with the complete button
    const completeButtonBlock = payload.message.blocks.find(
      block => block.accessory && block.accessory.action_id === 'completeOrder'
    );

    // Update the button text
    completeButtonBlock.accessory.text.text = updatedButtonText;
    completeButtonBlock.accessory.style = 'primary';

    payload.message.text = 'Job Completed ✅';

    // Send the updated message to Slack
    await client.chat.update({
      channel: payload.channel.id,
      ts: payload.message.ts,
      text: payload.message.text,
      blocks: payload.message.blocks,
    });
  }

  res.status(200).end();
}
