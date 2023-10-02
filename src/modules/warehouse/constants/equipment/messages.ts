import { ApiRequestMessages } from 'shared/types/messages'

export const getEquipmentNomenclatureListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка номенклатуры оборудования',
}

export const getEquipmentCategoryListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка категорий оборудования',
}

export const getEquipmentListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка оборудования',
}

export const getEquipmentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения оборудования',
}
