import { EllipsisConfig } from 'antd/es/typography/Base'

export const APP_NAME = 'Obermeister-ITSM'

export const DEFAULT_DEBOUNCE_VALUE = 150
export const DEFAULT_MODAL_WIDTH = 615

export const DEFAULT_FILE_NAME = 'Скачанный файл'

export const CANCEL_TEXT = 'Отменить'
export const CREATE_TEXT = 'Создать'
export const SAVE_TEXT = 'Сохранить'
export const UPDATE_TEXT = 'Обновить'
export const ADD_TEXT = 'Добавить'
export const SEND_TEXT = 'Отправить'
export const CONFIRM_TEXT = 'Подтвердить'
export const NO_ASSIGNEE_TEXT = 'Не назначен'

export const LAYOUT_CONTENT_PADDING_V = 32
export const HEADER_HEIGHT = 64
export const FOOTER_HEIGHT = 32

export const HYPHEN = '-'

export const commonEllipsisConfig: Pick<EllipsisConfig, 'rows' | 'expandable'> = {
  rows: 4,
  expandable: true,
}

export const commonApiErrorMessage = 'Неизвестная ошибка'
