import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import { logout as logoutAction } from 'features/auth/store/auth.slice'
import { taskLocalStorageService } from 'features/task/services/taskLocalStorageService/taskLocalStorage.service'

import { AppDispatch } from 'shared/hooks/useDispatch'

export const logoutAndClearTokens = (dispatch: AppDispatch) => {
  authLocalStorageService.clearTokens()
  taskLocalStorageService.clearTasksFilters()
  dispatch(logoutAction())
}
