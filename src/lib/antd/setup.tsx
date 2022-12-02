import { Spin, notification } from 'antd'

import { LoadingIcon } from 'components/Icons'
import { env } from 'configs/env'
import { ERROR_NOTIFICATION_DURATION } from 'shared/constants/notification'

const setup = () => {
  Spin.setDefaultIndicator(<LoadingIcon />)

  notification.config({
    ...(env.isProduction && { duration: ERROR_NOTIFICATION_DURATION }),
    top: 50,
  })
}

export default setup
