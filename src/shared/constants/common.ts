import { EllipsisConfig } from 'antd/es/typography/Base'

import { ApiRequestMessages } from 'shared/types/messages'

export const APP_NAME = 'Obermeister-ITSM'

export const DEFAULT_DEBOUNCE_VALUE = 150
export const DEFAULT_MODAL_WIDTH = 615

export const CANCEL_TEXT = 'Отменить'
export const CREATE_TEXT = 'Создать'
export const SAVE_TEXT = 'Сохранить'
export const ADD_TEXT = 'Добавить'
export const CONFIRM_TEXT = 'Подтвердить'

export const LAYOUT_CONTENT_PADDING_V = 32
export const FOOTER_HEIGHT = 32

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> = {
  rows: 4,
  expandable: true,
}

export const commonApiMessages: ApiRequestMessages<'unknownError'> = {
  unknownError: 'Неизвестная ошибка',
}
