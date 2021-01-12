const {
    TWILIO_ACCOUNT_SID: accountSID,
    TWILIO_AUTH_TOKEN: authToken,
    TWILIO_PHONE: twilioPhone,
} = process.env;

const twilio = require("twilio");
const client = twilio(accountSID, authToken)

export const handler = async (event, context) => {
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "Hello from my new function!", event, context })
    // };
    const response = await client.messages
        .create({
            body: "Mensaje desde Wonder Slug",
            from: `whatsapp:${twilioPhone}`,
            to: `whatsapp:${twilioPhone}`
        })
        console.log(response)
};
