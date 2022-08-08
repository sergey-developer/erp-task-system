import { notification } from 'antd'

import { ArgsProps as NotificationProps } from 'antd/lib/notification'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'

const showErrorNotification = (
  error: string,
  options: Omit<NotificationProps, 'message' | 'duration'> = {},
): void => {
  notification.error({
    message: error,
    duration: ERROR_NOTIFICATION_DURATION,
    ...options,
  })
}

export default showErrorNotification
