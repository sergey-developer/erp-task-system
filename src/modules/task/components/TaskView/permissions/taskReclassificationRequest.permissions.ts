import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { ObjectPermissionConfig } from 'shared/interfaces/permissions'

export const taskReclassificationRequestApiPermissions: ObjectPermissionConfig<'createRequest'> =
  {
    createRequest: {
      [UserRolesEnum.FirstLineSupport]: [PermissionsEnum.CanCreate],
      [UserRolesEnum.SeniorEngineer]: [PermissionsEnum.CanCreate],
      [UserRolesEnum.HeadOfDepartment]: [PermissionsEnum.CanCreate],
    },
  }
