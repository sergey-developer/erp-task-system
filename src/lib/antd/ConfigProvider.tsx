import { ConfigProvider as BaseConfigProvider } from 'antd'
import { ConfigProviderProps as BaseConfigProviderProps } from 'antd/lib/config-provider'
import ruRU from 'antd/lib/locale/ru_RU'
import { FC } from 'react'

import {
  validationMessages,
  validationTemplateMessages,
} from 'shared/constants/validation'

import setupAntd from './setup'

setupAntd()

const globalFormConfig: BaseConfigProviderProps['form'] = {
  colon: false,
  requiredMark: false,
  validateMessages: {
    required: validationMessages.required,
    whitespace: validationMessages.canNotBeEmpty,
    string: {
      max: validationTemplateMessages.string.max,
    },
    types: {
      email: validationMessages.email.incorrect,
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
