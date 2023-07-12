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
  CatalogsIndex = '/catalogs',
  CatalogList = '/catalogs/list',
  WarehouseList = '/catalogs/warehouses',
  Warehouse = '/catalogs/warehouses/:id',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
