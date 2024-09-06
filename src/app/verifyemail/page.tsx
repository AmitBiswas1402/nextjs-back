'use client'

import axios from 'axios'
import React, {useState} from 'react'

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async() => {
    try {
      await axios.post("/api/users/verifyemail", {token})
      setVerified(true)
    } catch (error:any) {
      setError(true)
    }
  }

  return (
    <div>page</div>
  )
}

