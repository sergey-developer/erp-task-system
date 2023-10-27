// todo: разделить по модулям
export enum RouteEnum {
  // other
  Root = '/',
  NotFound = '*',

  // auth
  Login = '/login',
  ForgotPassword = '/password/forgot',
  ChangePassword = '/password/change',

  // tasks
  Tasks = '/tasks',
  TaskList = '/tasks/list',
  TaskListMap = '/tasks/map',

  // work group
  WorkingGroups = '/working-groups',

  // monitoring
  Monitoring = '/monitoring',
  TaskMonitoring = '/monitoring/tasks',
}
