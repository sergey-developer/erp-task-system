export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // fiscal drives routes
  FiscalAccumulatorTaskList = '/fiscal-drives',

  // auth routes
  Login = '/login',
  ForgotPassword = '/forgot-password',

  // task routes
  TaskList = '/tasks',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
