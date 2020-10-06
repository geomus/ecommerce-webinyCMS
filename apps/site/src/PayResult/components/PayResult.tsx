import React from 'react';


export default function PayResult() {
    const params = new URLSearchParams(window.location.search)
    console.log(params)
    

    /** Logica de actualizar status order 
     * Mutation updateOrder(params.get('preferenece_id'))
     * Pasarle el status que devuelve mercado pago (params.get('collection_status'))
     */ 

    return (
        <div>
            PAY RESULT
        </div>
    );
}