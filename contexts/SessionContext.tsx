// contexts/SessionContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// ประกาศชนิดข้อมูลของ session และ status
interface SessionContextType {
  session: any; // คุณสามารถระบุ type ของ session ได้ เช่น UserSessionType
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  status: 'loading',
});

// hook สำหรับดึงค่า context
export const useSessionContext = () => useContext(SessionContext);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProviderCustom = ({ children }: SessionProviderProps) => {
  const { data: session, status } = useSession(); // ใช้ useSession ที่นี่

  return (
    <SessionContext.Provider value={{ session, status }}>
      {children}
    </SessionContext.Provider>
  );
};
