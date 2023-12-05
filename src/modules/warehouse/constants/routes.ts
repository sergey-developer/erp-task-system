export enum WarehouseRouteEnum {
  ManageWarehouses = '/home/manage-warehouses',
  WarehouseCatalogList = '/home/manage-warehouses/catalogs',
  WarehouseList = '/home/manage-warehouses/catalogs/warehouses',
  Warehouse = '/home/manage-warehouses/catalogs/warehouses/:id',

  NomenclatureList = '/home/manage-warehouses/catalogs/nomenclature',

  ReserveCatalogList = '/home/manage-warehouses/reserves-catalogs',
  EquipmentNomenclatureList = '/home/manage-warehouses/reserves-catalogs/equipment-nomenclature',
  EquipmentList = '/home/manage-warehouses/reserves-catalogs/equipment-nomenclature/:id',

  RelocationTaskList = '/home/manage-warehouses/reserves-catalogs/relocation-tasks',
  CreateRelocationTask = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/create',
  CreateRelocationTaskSimplified = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/create/simplified',
  EditRelocationTask = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/:id/edit',
}
