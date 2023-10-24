export enum WarehouseRouteEnum {
  ManageWarehouses = '/manage-warehouses',
  WarehouseCatalogList = '/manage-warehouses/catalogs',
  WarehouseList = '/manage-warehouses/catalogs/warehouses',
  Warehouse = '/manage-warehouses/catalogs/warehouses/:id',

  NomenclatureList = '/manage-warehouses/catalogs/nomenclature',

  ReserveCatalogList = '/manage-warehouses/reserves-catalogs',
  EquipmentNomenclatureList = '/manage-warehouses/reserves-catalogs/equipment-nomenclature',
  EquipmentList = '/manage-warehouses/reserves-catalogs/equipment-nomenclature/:id',

  RelocationTaskList = '/manage-warehouses/reserves-catalogs/relocation-tasks',
  CreateRelocationTask = '/manage-warehouses/reserves-catalogs/relocation-tasks/create',
  EditRelocationTask = '/manage-warehouses/reserves-catalogs/relocation-tasks/:id/edit',
}
