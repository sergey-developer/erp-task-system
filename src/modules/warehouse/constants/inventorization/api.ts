export enum InventorizationApiEnum {
  GetInventorizations = '/inventorizations/',
  GetInventorization = '/inventorizations/:id',
  CreateInventorization = '/inventorizations/',
  CompleteInventorization = '/inventorizations/:id/complete',

  GetInventorizationEquipments = '/inventorizations/:id/equipments',
  UpdateInventorizationEquipment = '/inventorizations/equipments/:inventorizationEquipmentId',
}

export enum InventorizationApiTagEnum {
  Inventorizations = 'Inventorizations',
}
