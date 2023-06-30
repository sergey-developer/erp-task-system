export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // fiscal accumulator routes
  FiscalAccumulatorTaskList = '/fiscal-drives',

  // auth routes
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // task routes
  TaskList = '/tasks',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
