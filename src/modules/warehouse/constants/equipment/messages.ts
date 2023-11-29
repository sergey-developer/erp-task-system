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

export const getEquipmentRelocationHistoryMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения информации о перемещении оборудования',
}

export const getEquipmentAttachmentListErrorMsg = 'Ошибка получения изображений оборудования'

export const getEquipmentCatalogListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения каталога оборудования',
}

export const getEquipmentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения оборудования',
}
