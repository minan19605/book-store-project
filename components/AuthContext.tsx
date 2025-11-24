'use client'

import { createContext, useContext } from 'react'
import { User } from 'firebase/auth'


interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    isModalOpen: boolean;
    logout: () => void;
    openModal: () => void;
    closeModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error(' useAuth must be inside the AuthProvider')
    }

    return context
}
