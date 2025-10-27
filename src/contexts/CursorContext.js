'use client';
import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  return (
    <CursorContext.Provider value={{ isCursorVisible, setIsCursorVisible }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}