import { ApiRequestMessages } from 'shared/types/messages'

export const createNomenclatureMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка создания номенклатурны',
}

export const updateNomenclatureMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления номенклатурной позиции',
}

export const getNomenclatureMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения номенклатурной позиции',
}

export const getNomenclatureListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка номенклатур',
}
