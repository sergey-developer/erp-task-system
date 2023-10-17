import { EllipsisConfig } from 'antd/es/typography/Base'

import { ApiRequestMessages } from 'shared/types/messages'

export const APP_NAME = 'Obermeister-ITSM'

export const DEFAULT_DEBOUNCE_VALUE = 100

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> = {
  rows: 4,
  expandable: true,
}

export const commonApiMessages: ApiRequestMessages<'unknownError'> = {
  unknownError: 'Неизвестная ошибка',
}
