import { ApiRequestMessages } from 'shared/types/messages'

export const getTimeZonesErrMsg = 'Ошибка получения временных зон'

export const getSubTaskTemplateListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Не удалось получить шаблоны заданий',
}

export const getUserStatusesErrMsg = 'Ошибка получения статусов пользователя'
export const getLocationsErrMsg = 'Ошибка получения списка меcтонахождений'
export const getFaChangeTypesErrMsg = 'Ошибка получения списка типов замены фискальных накопителей'
export const getUrgencyRateTypesErrMsg =
  'Ошибка получения списка тарифов срочности для работ по изменению инфраструктуры'
export const getResolutionClassificationsErrMsg =
  'Ошибка получения списка классификаций решения уровня 1'
