import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { UserPermissionConfig } from 'shared/interfaces/permissions'

const getTaskCommentListPermissions: UserPermissionConfig = {
  [UserRolesEnum.Engineer]: [PermissionsEnum.CanGet],
  [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
  [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
  [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
}

export default getTaskCommentListPermissions
