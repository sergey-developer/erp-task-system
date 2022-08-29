import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskApiPermissions: ObjectPermissionConfig<
  'task' | 'taskResolution'
> = {
  task: {
    [UserRolesEnum.Engineer]: [PermissionsEnum.CanGet],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanGet],
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanGet],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanGet],
  },
  taskResolution: {
    [UserRolesEnum.Engineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanUpdate],
    [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanUpdate],
  },
}
