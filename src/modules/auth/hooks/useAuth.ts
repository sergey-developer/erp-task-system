import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'

import { selectIsAuthenticated } from '../selectors'

function useAuth() {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return useMemo(() => ({ isAuthenticated }), [isAuthenticated])
}

export default useAuth
