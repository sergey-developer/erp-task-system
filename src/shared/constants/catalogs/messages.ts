import { ApiRequestMessages } from 'shared/types/messages'

export const getTimeZoneListErrorMsg = 'Ошибка получения временных зон'

export const getSubTaskTemplateListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось получить шаблоны заданий',
}

export const getUserStatusListErrorMsg = 'Ошибка получения статусов пользователя'

// todo: fix name
export const getLocationListMessagesErrorMsg = 'Ошибка получения списка меcтонахождений'
