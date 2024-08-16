import { UploadProps } from 'antd'
import { ReactNode } from 'react'

import { UseAuthUserResult } from 'modules/auth/hooks'
import { UsersGroupsModel, UsersModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/types'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import {
  LocationCatalogListItemModel,
  LocationsCatalogModel,
} from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'
import { MaybeNull } from 'shared/types/utils'

export type LocationOptionGroup = Pick<LocationOption, 'type' | 'label'> & {
  options: LocationOption[]
}

export type LocationOption = {
  type: LocationCatalogListItemModel['type']
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

  controllerIsRequired: boolean

  onUploadImage: NonNullable<UploadProps['customRequest']>
  imageIsUploading: boolean
  onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
  imageIsDeleting: boolean
  imagesIsLoading?: boolean

  relocateFromLocationList: LocationsCatalogModel
  relocateFromLocationListIsLoading: boolean
  relocateToLocationList: LocationsCatalogModel
  relocateToLocationListIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
