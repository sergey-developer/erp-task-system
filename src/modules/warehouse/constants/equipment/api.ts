export enum EquipmentApiEnum {
  GetEquipment = '/equipments/:id/',
  UpdateEquipment = '/equipments/:id/',
  CreateEquipment = '/equipments/',
  GetEquipmentList = '/equipments/',
  GetEquipmentCatalogList = '/equipments/catalog/',

  GetEquipmentCategoryList = '/equipments/categories/',

  GetEquipmentNomenclatureList = '/equipments/nomenclatures/reserves/',
}

export enum EquipmentApiTagEnum {
  Equipment = 'Equipment',
  EquipmentList = 'EquipmentList',
  EquipmentCatalogList = 'EquipmentCatalogList'
}
