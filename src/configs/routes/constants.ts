export enum RoutesEnum {
  Root = '/',
  SignIn = '/signIn',
  ForgotPassword = '/forgotPassword',
  RecoveryPassword = '/recoveryPassword',
  TaskList = '/tasks/view',
  WorkingGroups = '/workingGroups',
  AdminPanel = '/adminPanel',
  NotFound = '*',
}

export enum RoutesPathsEnum {
  TaskList = '/tasks/view/*',
}
