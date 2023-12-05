export enum EquipmentApiEnum {
  GetEquipment = '/equipments/:id/',
  UpdateEquipment = '/equipments/:id/',
  GetEquipmentAttachmentList = '/equipments/:id/attachments/',
  GetEquipmentRelocationHistory = '/equipments/:id/relocations/',
  CreateEquipment = '/equipments/',
  CreateEquipments = '/equipments/batch/',
  CreateEquipmentsByFile = '/equipments/template/',
  GetEquipmentList = '/equipments/',
  GetEquipmentCatalogList = '/equipments/catalog/',
  GetEquipmentCategoryList = '/equipments/categories/',
  GetEquipmentListTemplate = '/equipments/template/',
  GetEquipmentNomenclatureList = '/equipments/nomenclatures/reserves/',
}

export enum EquipmentApiTagEnum {
  Equipment = 'Equipment',
  EquipmentList = 'EquipmentList',
  EquipmentCatalogList = 'EquipmentCatalogList',
}
