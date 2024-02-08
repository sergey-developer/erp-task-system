import { UploadProps } from 'antd'
import { ReactNode } from 'react'

import { UsersModel } from 'modules/user/models'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { LocationListItemModel, LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type LocationOptionGroup = Pick<LocationOption, 'type' | 'label'> & {
  options: LocationOption[]
}

export type LocationOption = {
  type: LocationListItemModel['type']
  label: ReactNode
  value: IdType
}

export type RelocationTaskFormProps = {
  isLoading: boolean
  controllerIsRequired: boolean

  onUploadImage: NonNullable<UploadProps['customRequest']>
  imageIsUploading: boolean
  onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
  imageIsDeleting: boolean
  imagesIsLoading?: boolean

  userList: UsersModel
  userListIsLoading: boolean

  relocateFromLocationList: LocationListModel
  relocateFromLocationListIsLoading: boolean
  relocateToLocationList: LocationListModel
  relocateToLocationListIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}
