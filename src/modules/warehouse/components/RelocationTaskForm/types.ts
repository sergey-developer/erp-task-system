import { UploadProps } from 'antd'
import { ReactNode } from 'react'

import { UserListModel } from 'modules/user/models'
import { MatchExpectedPermissionsResult } from 'modules/user/utils'
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

export type RelocationTaskFormProps = {
  permissions: MaybeNull<MatchExpectedPermissionsResult>

  isLoading: boolean
  controllerIsRequired: boolean

  onUploadImage: NonNullable<UploadProps['customRequest']>
  imageIsUploading: boolean
  onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
  imageIsDeleting: boolean
  imagesIsLoading?: boolean

  userList: UserListModel
  userListIsLoading: boolean

  relocateFromLocationList: LocationsModel
  relocateFromLocationListIsLoading: boolean
  relocateToLocationList: LocationsModel
  relocateToLocationListIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
