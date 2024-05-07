import { ApiRequestMessages } from 'shared/types/messages'

export const getEquipmentNomenclaturesErrMsg = 'Ошибка получения списка номенклатуры оборудования'
export const getEquipmentCategoriesErrMsg = 'Ошибка получения списка категорий оборудования'

export const getEquipmentsErrMsg = 'Ошибка получения списка оборудования'
export const getEquipmentsXlsxErrMsg = 'Ошибка выгрузки списка оборудования в Excel'

export const getEquipmentRelocationHistoryMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения информации о перемещении оборудования',
}

export const getEquipmentAttachmentListErrMsg = 'Ошибка получения изображений оборудования'
export const getEquipmentCatalogListErrMsg = 'Ошибка получения каталога оборудования'

export const getEquipmentMessages: ApiRequestMessages<'commonError'> = {
  commonError: 'Ошибка получения оборудования',
}

export const createEquipmentErrMsg = 'Ошибка создания оборудования'
export const createEquipmentsErrMsg = 'Ошибка создания списка оборудования'
export const importEquipmentsByFileErrMsg = 'Ошибка загрузки оборудования из файла'
export const updateEquipmentErrMsg = 'Ошибка редактирования оборудования'

export const getEquipmentListTemplateErrMsg =
  'Ошибка формирования шаблона для загрузки оборудования из файла'
