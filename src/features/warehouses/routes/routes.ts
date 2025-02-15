export enum WarehousesRoutesEnum {
  ManageWarehouses = '/home/manage-warehouses',

  CreateDocumentsPackage = '/home/manage-warehouses/create-documents-package',

  WarehousesCatalog = '/home/manage-warehouses/catalogs',
  Warehouses = '/home/manage-warehouses/catalogs/warehouses',
  Warehouse = '/home/manage-warehouses/catalogs/warehouses/:id',
  Nomenclatures = '/home/manage-warehouses/catalogs/nomenclature',

  Reserves = '/home/manage-warehouses/reserves-catalogs',
  EquipmentNomenclatures = '/home/manage-warehouses/reserves-catalogs/equipment-nomenclature',
  Equipments = '/home/manage-warehouses/reserves-catalogs/equipment-nomenclature/:id',
  RelocationTasks = '/home/manage-warehouses/reserves-catalogs/relocation-tasks',

  CreateRelocationTask = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/create',
  CreateRelocationTaskSimplified = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/create/simplified',

  EditRelocationTask = '/home/manage-warehouses/reserves-catalogs/relocation-tasks/:id/edit',

  CreateRelocationTaskDraft = '/home/manage-warehouses/reserves-catalogs/inventorizations/relocation-tasks/create/draft',
  EditRelocationTaskDraft = '/home/manage-warehouses/reserves-catalogs/inventorizations/relocation-tasks/:relocationTaskId/edit/draft',

  Inventorizations = '/home/manage-warehouses/reserves-catalogs/inventorizations',
  ExecuteInventorization = '/home/manage-warehouses/reserves-catalogs/inventorizations/:inventorizationId/execute',

  Reports = '/home/manage-warehouses/reports',
  EmployeesActions = '/home/manage-warehouses/reports/employees-actions',
  AmountEquipmentSpent = '/home/manage-warehouses/reports/amount-equipment-spent',
  HistoryNomenclatureOperations = '/home/manage-warehouses/reports/history-nomenclature-operations',
}
