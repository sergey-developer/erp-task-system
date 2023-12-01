import { notification, Spin } from 'antd'

import { env } from 'configs/env'

import { LoadingIcon } from 'components/Icons'

const setup = () => {
  Spin.setDefaultIndicator(<LoadingIcon />)

  notification.config({
    duration: env.isProduction ? 0 : undefined,
    top: 50,
  })
}

export default setup
