const {
    TWILIO_ACCOUNT_SID: accountSID,
    TWILIO_AUTH_TOKEN: authToken,
    TWILIO_PHONE: twilioPhone
} = process.env;

const twilio = require("twilio");
const client = twilio(accountSID, authToken);

export const handler = async (event, context) => {
    const {user, message, orderId, phone} = JSON.parse(Buffer.from(event.body, "base64").toString("utf-8"))
    const response = await client.messages.create({
        body: `Hola, ${user}. ${message}, Pedido N° ${orderId}`,
        from: `whatsapp:${twilioPhone}`,
        to: `whatsapp:${phone}`
    });
    return {
        statusCode: 200,
        body: JSON.stringify({ response: response, event, context })
    };
};
