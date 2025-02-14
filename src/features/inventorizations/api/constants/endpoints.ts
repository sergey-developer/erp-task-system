export enum InventorizationsEndpointsEnum {
  GetInventorizations = '/inventorizations/',
  GetInventorization = '/inventorizations/:id',
  CreateInventorization = '/inventorizations/',
  CompleteInventorization = '/inventorizations/:id/complete',

  GetInventorizationEquipments = '/inventorizations/:inventorizationId/equipments',
  GetInventorizationEquipment = '/inventorizations/equipments/:equipmentId',
  CreateInventorizationEquipment = '/inventorizations/:inventorizationId/equipments',
  GetInventorizationEquipmentsTemplate = '/inventorizations/equipments/template/',
  CheckInventorizationEquipmentsTemplate = '/inventorizations/equipments/template/',
  CheckInventorizationEquipments = '/inventorizations/equipments/batch/',

  UpdateInventorizationEquipment = '/inventorizations/equipments/:inventorizationEquipmentId',
}

export enum InventorizationsEndpointsTagsEnum {
  Inventorizations = 'Inventorizations',
  InventorizationEquipments = 'InventorizationEquipments',
}
