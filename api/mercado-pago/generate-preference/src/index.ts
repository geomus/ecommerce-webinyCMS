import {generatePreference} from "mercadopago"

export const handler = async (event, context) => {
    // return await generatePreference(event.body, event.token);   
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'HOLA MUNDO', event, context})
    }
};
