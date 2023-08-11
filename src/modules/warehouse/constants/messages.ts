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

export const createNomenclatureGroupMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка создания номенклатурной группы',
  }

export const updateNomenclatureGroupMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка обновления номенклатурной группы',
  }

export const getNomenclatureGroupListMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка получения списка номенклатурных групп',
  }

export const createNomenclatureMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка создания номенклатурны',
}

export const getNomenclatureListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка номенклатур',
}

export const getMeasurementUnitListMessages: ApiRequestMessages<'commonError'> =
  {
    commonError: 'Ошибка получения списка единиц измерения',
  }

export const getCountryListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка стран производителей',
}
