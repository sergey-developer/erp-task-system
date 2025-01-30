import { ApiRequestMessages } from 'shared/types/messages'

export const createNomenclatureGroupMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка создания номенклатурной группы',
}

export const updateNomenclatureGroupMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка обновления номенклатурной группы',
}

export const getNomenclatureGroupListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка номенклатурных групп',
}
