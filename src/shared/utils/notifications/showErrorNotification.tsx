import { notification } from 'antd'
import { ArgsProps as NotificationProps } from 'antd/es/notification/interface'

export const showErrorNotification = (
  data: string | string[],
  options: Omit<NotificationProps, 'message'> = {},
): void => {
  if (Array.isArray(data)) {
    data.forEach((error) => {
      notification.error({ message: error, ...options })
    })
  } else {
    notification.error({ message: data, ...options })
  }
}
