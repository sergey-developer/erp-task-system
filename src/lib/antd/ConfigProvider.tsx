import { App, ConfigProvider as BaseConfigProvider, ThemeConfig } from 'antd'
import { ConfigProviderProps as BaseConfigProviderProps } from 'antd/lib/config-provider'
import ruRU from 'antd/lib/locale/ru_RU'
import { FC } from 'react'

import { validationMessages, validationTemplateMessages } from 'shared/constants/validation'

import theme from 'styles/theme'

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
      url: validationMessages.url.incorrect,
      email: validationMessages.email.incorrect,
    },
  },
}

type ConfigProviderProps = Pick<BaseConfigProviderProps, 'children'>

const themeConfig: ThemeConfig = {
  components: {
    Layout: {
      headerBg: theme.colors.white,
    },
    Form: {
      labelColor: theme.colors.oldSilver,
    },
  },
}

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  return (
    <BaseConfigProvider theme={themeConfig} locale={ruRU} virtual={false} form={globalFormConfig}>
      <App>{children}</App>
    </BaseConfigProvider>
  )
}

export default ConfigProvider
