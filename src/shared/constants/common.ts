import { EllipsisConfig } from 'antd/es/typography/Base'

import { ApiRequestMessages } from 'shared/types/messages'

export const APP_NAME: string = 'Obermeister-ITSM'

export const DOUBLE_CLICK_DEBOUNCE_TIME: number = 300

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> = {
  rows: 4,
  expandable: true,
}

export const commonApiMessages: ApiRequestMessages<'unknownError'> = {
  unknownError: 'Неизвестная ошибка',
}
