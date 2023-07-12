export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // auth routes
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // task routes
  TaskList = '/tasks',
  FiscalAccumulatorTaskList = '/tasks/fiscal-accumulators',

  // warehouse routes
  Warehouses = '/warehouses',
  WarehouseCatalogList = '/warehouses/catalogs',
  WarehouseList = '/warehouses/list',
  Warehouse = '/warehouses/:id',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
