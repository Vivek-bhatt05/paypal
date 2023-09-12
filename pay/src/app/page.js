'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {

  const [show,setShow] = useState(false);
  const [success,setSuccess] = useState(false);
  const [error,setErrror] = useState('');
  const [orderId,setOrderId] = useState('');
  
  const createOrder = (data,actions)=>{
    return actions.order.create({
       purchase_units:[
        {
        description:"Subscribe",
        amount:{
          value:10
        },
       },
      ]
    }).then((orderId)=>{
      setOrderId(orderId)
      return orderId
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details){
      const {payer} = details
      setSuccess(true)
      console.log(payer)
    })
  }

  const onError = (data,actions) =>{
    setErrror("Error occured")
  }

  console.log(orderId)

  return (
    <main>
      <PayPalScriptProvider options={{
          clientId: "AcJ6dT7fk3l4xfzw5d7EnIe9UyGYv_pzCZDFx7tyboOImd_PXVBKuhLxKnuLSxli3GPRx-Cdw5vbcid0",
      }}>
        <h1>Subscribe</h1>
        <span>₹ 10 </span>
        <br />
        <button onClick={()=>setShow(true)} type='submit'>Buy</button>

        {show ? (
             <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} onError={onError} />
        ): null}

      </PayPalScriptProvider>
    </main>
  )
}
