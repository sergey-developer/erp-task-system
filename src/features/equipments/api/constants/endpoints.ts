export enum EquipmentsEndpointsEnum {
  GetEquipment = '/equipments/:id',
  UpdateEquipment = '/equipments/:id',
  GetEquipmentAttachments = '/equipments/:id/attachments',
  GetEquipmentRelocationHistory = '/equipments/:id/relocations',
  CreateEquipment = '/equipments/',
  CreateEquipments = '/equipments/batch/',
  ImportEquipmentsByFile = '/equipments/template/',
  GetEquipments = '/equipments/',
  GetEquipmentsCatalog = '/equipments/catalog/',
  GetEquipmentCategories = '/equipments/categories/',
  GetEquipmentsTemplate = '/equipments/template/',
  GetEquipmentNomenclatures = '/equipments/nomenclatures/reserves/',
  CreateEquipmentTechnicalExamination = '/equipments/technical-examinations/',
}

export enum EquipmentsEndpointsTagsEnum {
  Equipment = 'Equipment',
  Equipments = 'Equipments',
  EquipmentsCatalog = 'EquipmentsCatalog',
}
