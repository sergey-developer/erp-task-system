import { ApiRequestMessages } from 'shared/types/messages'

export const getUserMeMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось получить профиль пользователя',
}

export const updateUserMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления пользователя',
}

export const updateUserTimeZoneMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления временной зоны пользователя',
}

export const getUserStatusListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения статусов пользователя',
}

export const updateUserStatusMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления статуса пользователя',
}
