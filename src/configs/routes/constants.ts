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

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
