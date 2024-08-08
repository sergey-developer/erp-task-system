import { UploadProps } from 'antd'
import { ReactNode } from 'react'

import { UseAuthUserResult } from 'modules/auth/hooks'
import { UsersGroupsModel, UsersModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/utils'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { LocationListItemModel, LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'
import { MaybeNull } from 'shared/types/utils'

export type LocationOptionGroup = Pick<LocationOption, 'type' | 'label'> & {
  options: LocationOption[]
}

export type LocationOption = {
  type: LocationListItemModel['type']
  label: ReactNode
  value: IdType
}

export type ExecutorOptionGroup = Pick<ExecutorOption, 'label' | 'value'> & {
  options: ExecutorOption[]
}

export type ExecutorOption = {
  label: string
  value: IdType | string
  users?: IdType[]
}

export type RelocationTaskFormProps = {
  authUser: UseAuthUserResult
  permissions: MaybeNull<MatchedUserPermissions>

  isLoading: boolean

  users: UsersModel
  usersIsLoading: boolean

  usersGroups: UsersGroupsModel
  usersGroupsIsLoading: boolean

  deadlineDisabled?: boolean
  controllerIsRequired: boolean

  showUploadImages?: boolean
  onUploadImage?: NonNullable<UploadProps['customRequest']>
  imageIsUploading?: boolean
  onDeleteImage?: NonNullable<UploadProps<FileResponse>['onRemove']>
  imageIsDeleting?: boolean
  imagesIsLoading?: boolean

  relocateFromLocations: LocationsModel
  relocateFromLocationListIsLoading: boolean
  relocateToLocations: LocationsModel
  relocateToLocationListIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
