import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './AuthPage.css'
import SignUp from '../../components/SignUp/SignUp'
import SignIn from '../../components/SignIn/SignIn'

export default function AuthPage() {
  return (
      <Routes>
          <Route path='registration' element={<SignUp />} />
          <Route path='login' element={<SignIn />} />
      </Routes>
  )
}
