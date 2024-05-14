import { ApiRequestMessages } from 'shared/types/messages'

export const getUserMeErrorMsg = 'Не удалось получить профиль пользователя'

export const getUsersErrMsg = 'Ошибка получения списка пользователей'

export const getUserActionsErrMsg =
  'Ошибка получения списка действий, доступных пользователю в соответствии с его правами'

export const updateUserMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления пользователя',
}

export const updateUserTimeZoneMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления временной зоны пользователя',
}

export const updateUserStatusMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления статуса пользователя',
}

export const getWarehouseMSIErrorMsg = 'Ошибка получения склада инженера'
