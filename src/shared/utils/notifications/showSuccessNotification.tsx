import { notification } from 'antd'
import { ArgsProps as NotificationProps } from 'antd/es/notification/interface'

export const showSuccessNotification = (
  error: string,
  options: Omit<NotificationProps, 'message'> = {},
): void => {
  notification.success({
    message: error,
    ...options,
  })
}
