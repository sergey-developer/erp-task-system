import { logout as logoutAction } from 'modules/auth/auth.slice'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import { AppDispatch } from 'shared/hooks/useDispatch'

export const logoutAndClearTokens = (dispatch: AppDispatch) => {
  authLocalStorageService.removeAccessToken()
  authLocalStorageService.removeRefreshToken()
  dispatch(logoutAction())
}
