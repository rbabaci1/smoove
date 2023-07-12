import twilio from 'twilio';

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export default async function sendSms(req, res) {
  const { phoneNumber, message } = req.body;

  if (req.method === 'POST') {
    try {
      const twilioResponse = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      res.status(200).json({
        success: true,
        message: 'SMS sent successfully',
        twilioResponse,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
