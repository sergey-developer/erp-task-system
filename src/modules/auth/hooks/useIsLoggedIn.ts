import { isLoggedInSelector } from 'modules/auth/selectors'

import { useSelector } from 'shared/hooks/useSelector'

/**
 * Хук возвращающий значение, авторизован пользователь или нет
 */

export const useIsLoggedIn = (): boolean => {
  return useSelector(isLoggedInSelector)
}
