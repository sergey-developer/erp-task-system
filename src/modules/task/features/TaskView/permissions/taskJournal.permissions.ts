import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

export const taskJournalApiPermissions: UserPermissionConfig = {
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGetList],
  [UserRolesEnum.Engineer]: [PermissionsEnum.CanGetList],
  [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGetList],
  [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGetList],
}
