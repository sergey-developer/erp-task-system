import { ConfigProvider as BaseConfigProvider } from 'antd'
import { FC } from 'react'

import { ConfigProviderProps as BaseConfigProviderProps } from 'antd/lib/config-provider'
import ruRU from 'antd/lib/locale/ru_RU'
import {
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  INCORRECT_EMAIL_MSG,
  REQUIRED_FIELD_MSG,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/validation'

import setupAntd from './setup'

setupAntd()

const globalFormConfig: BaseConfigProviderProps['form'] = {
  colon: false,
  requiredMark: false,
  validateMessages: {
    required: REQUIRED_FIELD_MSG,
    whitespace: FIELD_CAN_NOT_BE_EMPTY_MSG,
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
