import { ConfigProvider as BaseConfigProvider } from 'antd'
import { FC } from 'react'

import { ConfigProviderProps as BaseConfigProviderProps } from 'antd/lib/config-provider'
import ruRU from 'antd/lib/locale/ru_RU'
import {
  INCORRECT_EMAIL_MSG,
  REQUIRED_FIELD_MSG,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/messages'

const globalFormConfig: BaseConfigProviderProps['form'] = {
  colon: false,
  requiredMark: false,
  validateMessages: {
    required: REQUIRED_FIELD_MSG,
    string: {
      max: TEXT_MAX_LENGTH_MSG,
    },
    types: {
      email: INCORRECT_EMAIL_MSG,
    },
  },
}

type ConfigProviderProps = Pick<BaseConfigProviderProps, 'children'>

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  return (
    <BaseConfigProvider locale={ruRU} virtual={false} form={globalFormConfig}>
      {children}
    </BaseConfigProvider>
  )
}

export default ConfigProvider
