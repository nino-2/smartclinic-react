import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './src/context/AuthContext'

const ProtectedRoutes = ({children}) => {
    const {isLoggedIn} = useAuth()
    if(!isLoggedIn) {
        return <Navigate to="/auth/login" />
    }
    return children
}

export default ProtectedRoutes
