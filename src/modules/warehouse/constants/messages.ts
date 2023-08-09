import { ApiRequestMessages } from 'shared/types/messages'

export const getWarehouseListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка складов',
}

export const getWarehouseMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения склада',
}

export const getLegalEntityListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка юридических лиц',
}

export const createNomenclatureGroupMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка создания номенклатурной группы',
}
