// todo: разделить по модулям
export enum RouteEnum {
  // other routes
  Root = '/',
  NotFound = '*',

  // auth routes
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // desktop routes
  Desktop = '/desktop',
  DesktopTaskList = '/desktop/tasks/list',
  DesktopTaskListMap = '/desktop/tasks/map',

  // work group routes
  WorkingGroups = '/working-groups',

  // monitoring routes
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
