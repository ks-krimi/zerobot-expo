import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [loggedIN, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ loggedIN, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
