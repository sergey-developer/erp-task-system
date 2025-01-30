import { logout as logoutAction } from 'features/auth/auth.slice'
import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import { taskLocalStorageService } from 'features/task/services/taskLocalStorageService/taskLocalStorage.service'

import { AppDispatch } from 'shared/catalogs/hooks/useDispatch'

export const logoutAndClearTokens = (dispatch: AppDispatch) => {
  authLocalStorageService.clearTokens()
  taskLocalStorageService.clearTasksFilters()
  dispatch(logoutAction())
}
