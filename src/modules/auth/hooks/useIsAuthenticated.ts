import { useMemo } from 'react'

import { useSelector } from 'shared/hooks/useSelector'

import { isAuthenticatedSelector } from '../selectors'

/**
 * Хук возвращающий значение, авторизован пользователь или нет
 */

export const useIsAuthenticated = (): boolean => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  return useMemo(() => isAuthenticated, [isAuthenticated])
}
