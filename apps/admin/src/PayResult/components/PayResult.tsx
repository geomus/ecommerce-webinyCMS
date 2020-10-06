import React from 'react';


export default function PayResult() {

    const params = new URLSearchParams(window.location.search)
    console.log(params)

    return (
        <div>
            PAY RESULT
        </div>
    );
}