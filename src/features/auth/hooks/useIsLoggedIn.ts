import { isLoggedInSelector } from 'features/auth/selectors'

import { useSelector } from 'shared/catalogs/hooks/useSelector'

/**
 * Хук возвращающий значение, авторизован пользователь или нет
 */

export const useIsLoggedIn = (): boolean => {
  return useSelector(isLoggedInSelector)
}
