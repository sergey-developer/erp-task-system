// todo: разделить по модулям
export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // auth routes
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // task routes
  Tasks = '/tasks',
  TaskList = '/tasks/list',
  TaskListMap = '/tasks/map',
  FiscalAccumulatorTaskList = '/tasks/fiscal-accumulators',

  // warehouse routes
  ManageWarehouses = '/manage-warehouses',
  WarehouseCatalogList = '/manage-warehouses/catalogs',
  WarehouseList = '/manage-warehouses/catalogs/warehouses',
  Warehouse = '/manage-warehouses/catalogs/warehouses/:id',
  NomenclatureList = '/manage-warehouses/catalogs/nomenclature',
  ReserveCatalogList = '/manage-warehouses/reserves-catalogs',
  ReserveEquipmentNomenclatureList = '/manage-warehouses/reserves-catalogs/equipment-nomenclature',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
