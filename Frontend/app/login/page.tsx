'use client'
import React from 'react'

export default function page() {
  return (
    <div>
      <p>Login page</p>
      <div>
        <input type="email" name="email" id="email" className='border m-2' />
        <input type="password" name="password" id="password"  className='border m-2'/>
        <button>Login with email</button>
      </div>
      <div>
        <button>Login with Google</button>
        <button>Login with FaceBook</button>
        <button>Login with Twitter</button>
      </div>
    </div>
  )
}
