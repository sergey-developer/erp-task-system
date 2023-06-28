export enum RouteEnum {
  // common routes
  Root = '/',
  NotFound = '*',

  // auth routes
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // task routes
  TaskList = '/tasks',

  // work group routes
  WorkingGroups = '/workingGroups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
