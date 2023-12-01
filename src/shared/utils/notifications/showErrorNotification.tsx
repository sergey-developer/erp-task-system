import { notification } from 'antd'
import { ArgsProps as NotificationProps } from 'antd/es/notification/interface'

export const showErrorNotification = (
  errorOrErrorList: string | string[],
  options: Omit<NotificationProps, 'message'> = {},
): void => {
  if (Array.isArray(errorOrErrorList)) {
    if (errorOrErrorList.length) {
      errorOrErrorList.forEach((error) => {
        notification.error({ message: error, ...options })
      })
    }
  } else {
    notification.error({ message: errorOrErrorList, ...options })
  }
}
