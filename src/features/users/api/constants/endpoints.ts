export enum UsersApiPathsEnum {
  GetUsers = '/users/',
  UpdateUser = '/users/:id',
  GetUserMe = '/users/me/',
  GetUserMeCode = '/users/me/code/',
  UpdateUserStatus = '/users/:id/status',
  GetWarehouseMSI = '/users/:id/mobile-warehouse',
  GetUsersGroups = '/users/groups/',
  GetUserActions = '/users/:id/actions',
}

export enum UsersEndpointsTagsEnum {
  UserActions = 'UserActions',
}
