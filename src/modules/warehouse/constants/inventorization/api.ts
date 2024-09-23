export enum InventorizationApiEnum {
  GetInventorizations = '/inventorizations/',
  GetInventorization = '/inventorizations/:id',
  CreateInventorization = '/inventorizations/',
  GetInventorizationEquipments = '/inventorizations/:inventorizationId/equipments',
  GetInventorizationEquipment = '/inventorizations/equipments/:equipmentId',
  CreateInventorizationEquipment = '/inventorizations/:inventorizationId/equipments',
  CompleteInventorization = '/inventorizations/:id/complete',
  GetInventorizationEquipmentsTemplate = '/inventorizations/equipments/template/',
  CheckInventorizationEquipmentsTemplate = '/inventorizations/equipments/template/',

  UpdateInventorizationEquipment = '/inventorizations/equipments/:inventorizationEquipmentId',
}

export enum InventorizationApiTagEnum {
  Inventorizations = 'Inventorizations',
  InventorizationEquipments = 'InventorizationEquipments',
}
