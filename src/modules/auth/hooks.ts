import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { selectIsAuthenticated } from './authSlice'

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return useMemo(() => ({ isAuthenticated }), [isAuthenticated])
}
