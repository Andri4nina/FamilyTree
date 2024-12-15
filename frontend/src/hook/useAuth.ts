import { useCallback, useContext, useEffect, useState } from 'react';

import UserContext from '../context/UserContext';

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2
}

export function useAuth() {
  const userData = useContext(UserContext);
  
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (userData === null) {
      setStatus(AuthStatus.Guest);
    } else if (userData === undefined) {
      setStatus(AuthStatus.Unknown);
    } else {
      setStatus(AuthStatus.Authenticated);
    }
  }, [userData]);
  
 

  return {
    userData,
    status
  };
}
