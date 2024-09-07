'use client'

import axios from 'axios'
import { verify } from 'crypto'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'

export default function VerifyEmailPage() {

  // const router = useRouter()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async() => {
    try {
      await axios.post("/api/users/verifyemail", {token})
      setVerified(true)
      setError(true)
    } catch (error:any) {
      setError(true)
    }
  }

  // take token from url
  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const {query} = router
    // const urlTokenTwo = query.token 

  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-4xl'>Verify EMail</h1>
      <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}

