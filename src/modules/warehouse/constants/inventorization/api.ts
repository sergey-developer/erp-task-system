export enum InventorizationApiEnum {
  GetInventorizations = '/inventorizations/',
  GetInventorization = '/inventorizations/:id',
  CreateInventorization = '/inventorizations/',
  CompleteInventorization = '/inventorizations/:id/complete',

  GetInventorizationEquipments = '/inventorizations/:inventorizationId/equipments',
  CreateInventorizationEquipment = '/inventorizations/:inventorizationId/equipments',
  UpdateInventorizationEquipment = '/inventorizations/equipments/:inventorizationEquipmentId',
}

export enum InventorizationApiTagEnum {
  Inventorizations = 'Inventorizations',
  InventorizationEquipments = 'InventorizationEquipments',
}
