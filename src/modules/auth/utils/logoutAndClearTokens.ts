import { logout as logoutAction } from 'modules/auth/auth.slice'
import { authLocalStorageService } from 'modules/auth/services/authLocalStorage.service'
import { taskLocalStorageService } from 'modules/task/services/taskLocalStorage/taskLocalStorage.service'

import { AppDispatch } from 'shared/hooks/useDispatch'

export const logoutAndClearTokens = (dispatch: AppDispatch) => {
  authLocalStorageService.clearTokens()
  taskLocalStorageService.clearTaskListPageFilters()
  dispatch(logoutAction())
}
