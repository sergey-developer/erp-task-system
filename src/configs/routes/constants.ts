export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // auth routes
  Login = '/login',
  ForgotPassword = '/forgot-password',

  // task routes
  TaskList = '/tasks',
  FiscalAccumulatorTaskList = '/tasks/fiscal-accumulators',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
