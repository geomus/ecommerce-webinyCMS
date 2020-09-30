import {generatePreference} from "mercadopago-utils";

export const handler = async (event) => {
    return await generatePreference(event.body);
};
