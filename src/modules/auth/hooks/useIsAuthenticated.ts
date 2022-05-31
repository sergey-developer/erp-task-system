import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'

import { isAuthenticatedSelector } from '../selectors'

const useIsAuthenticated = (): boolean => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  return useMemo(() => isAuthenticated, [isAuthenticated])
}

export default useIsAuthenticated
