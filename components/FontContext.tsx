'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface FontContextType {
    fontSizeMode: number;
    setFontSizeMode: (mode:number) => void
}

// Set initial value by using a empty function
const FontContext = createContext<FontContextType>( {
    fontSizeMode: 0,
    setFontSizeMode: () => {},
});

export function FontProvider( {children }: { children: ReactNode }) {
    const [fontSizeMode, setFontSizeMode] = useState(0);

    return (
        <FontContext.Provider value = {{fontSizeMode, setFontSizeMode}}>
            {children}
        </FontContext.Provider>
    )
}

export const useFont = () => useContext(FontContext)