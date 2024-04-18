import { ApiRequestMessages } from 'shared/types/messages'

export const getEquipmentNomenclaturesErrMsg = 'Ошибка получения списка номенклатуры оборудования'

export const getEquipmentCategoryListMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения списка категорий оборудования',
}

export const getEquipmentsErrorMsg = 'Ошибка получения списка оборудования'
export const getEquipmentsXlsxErrorMsg = 'Ошибка выгрузки списка оборудования в Excel'

export const getEquipmentRelocationHistoryMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения информации о перемещении оборудования',
}

export const getEquipmentAttachmentListErrorMsg = 'Ошибка получения изображений оборудования'
export const getEquipmentCatalogListErrorMsg = 'Ошибка получения каталога оборудования'

export const getEquipmentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения оборудования',
}

export const createEquipmentErrorMsg = 'Ошибка создания оборудования'
export const createEquipmentsErrorMsg = 'Ошибка создания списка оборудования'
export const importEquipmentsByFileErrorMsg = 'Ошибка загрузки оборудования из файла'
export const updateEquipmentErrorMsg = 'Ошибка редактирования оборудования'

export const getEquipmentListTemplateErrorMsg =
  'Ошибка формирования шаблона для загрузки оборудования из файла'
