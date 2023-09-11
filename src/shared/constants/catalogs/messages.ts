import { ApiRequestMessages } from 'shared/types/messages'

export const getTimeZoneListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения временных зон',
}

export const getSubTaskTemplateListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось получить шаблоны заданий',
}
