import {generatePreference} from "mercadopago"

export const handler = async (event) => {
    return await generatePreference(event.body, event.token);   
};
