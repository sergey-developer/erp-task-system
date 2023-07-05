import { notification } from 'antd'
import { ArgsProps as NotificationProps } from 'antd/es/notification'

export const showErrorNotification = (
  error: string,
  options: Omit<NotificationProps, 'message'> = {},
): void => {
  notification.error({
    message: error,
    ...options,
  })
}

export const showMultipleErrorNotification = (errors: Array<string>): void => {
  errors.forEach((error) => {
    showErrorNotification(error)
  })
}
