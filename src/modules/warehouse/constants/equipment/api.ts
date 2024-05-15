export enum EquipmentApiEnum {
  GetEquipment = '/equipments/:id',
  UpdateEquipment = '/equipments/:id',
  GetEquipmentAttachmentList = '/equipments/:id/attachments',
  GetEquipmentRelocationHistory = '/equipments/:id/relocations',
  CreateEquipment = '/equipments/',
  CreateEquipments = '/equipments/batch/',
  ImportEquipmentsByFile = '/equipments/template/',
  GetEquipmentList = '/equipments/',
  GetEquipmentCatalogList = '/equipments/catalog/',
  GetEquipmentCategoryList = '/equipments/categories/',
  GetEquipmentListTemplate = '/equipments/template/',
  GetEquipmentNomenclatures = '/equipments/nomenclatures/reserves/',
}

export enum EquipmentApiTagEnum {
  Equipment = 'Equipment',
  Equipments = 'Equipments',
  EquipmentCatalogList = 'EquipmentCatalogList',
}
