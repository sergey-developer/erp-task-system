import { notification } from 'antd'
import { ArgsProps as NotificationProps } from 'antd/es/notification'

const showErrorNotification = (
  error: string,
  options: Omit<NotificationProps, 'message'> = {},
): void => {
  notification.error({
    message: error,
    ...options,
  })
}

export default showErrorNotification
