import { notification } from 'antd'

import { ArgsProps as NotificationProps } from 'antd/lib/notification'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'
import { getErrorDetail } from 'shared/services/api'

const showErrorNotification = (
  error: any,
  options: Omit<NotificationProps, 'message' | 'duration'> = {},
): void => {
  notification.error({
    message: typeof error === 'string' ? error : getErrorDetail(error),
    duration: ERROR_NOTIFICATION_DURATION,
    ...options,
  })
}

export default showErrorNotification
