import { UploadProps } from 'antd'
import { MatchedUserPermissions } from 'features/user/types'
import { RelocationTaskTypeEnum } from 'features/warehouse/constants/relocationTask'
import { Moment } from 'moment-timezone'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { ReactNode } from 'react'

import { LocationCatalogItemDTO, LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'
import { MaybeNull } from 'shared/types/utils'

export type LocationOption = {
  type: LocationCatalogItemDTO['type']
  label: ReactNode
  value: IdType
}

export type LocationOptionGroup = Pick<LocationOption, 'type' | 'label'> & {
  options: LocationOption[]
}

export type UserOption = {
  label: string
  value: IdType
}

export type UserGroupOption = {
  label: string
  value: string | IdType
  users?: IdType[]
}

export type UserGroupOptionGroup = Pick<UserGroupOption, 'label' | 'value'> & {
  options: UserOption[] | UserGroupOption[]
}

export type RelocationTaskFormProps<
  FormFields extends BaseRelocationTaskFormFields = BaseRelocationTaskFormFields,
> = {
  permissions: MaybeNull<MatchedUserPermissions>

  isLoading: boolean

  executorsOptions: UserGroupOptionGroup[]
  executorsIsLoading: boolean

  controllersOptions: DefaultOptionType[]
  controllersIsLoading: boolean

  controllerIsRequired: boolean

  disabledFields?: Array<keyof Pick<FormFields, 'deadlineAtDate' | 'deadlineAtTime'>>

  showUploadImages?: boolean
  onUploadImage?: NonNullable<UploadProps['customRequest']>
  imageIsUploading?: boolean
  onDeleteImage?: NonNullable<UploadProps<FileResponse>['onRemove']>
  imageIsDeleting?: boolean
  imagesIsLoading?: boolean

  relocateFromLocations: LocationsCatalogDTO
  relocateFromLocationsIsLoading: boolean
  relocateToLocations: LocationsCatalogDTO
  relocateToLocationsIsLoading: boolean

  type?: RelocationTaskTypeEnum
  onChangeType: (value: RelocationTaskTypeEnum) => void

  onChangeRelocateFrom: (value: IdType, option: LocationOption) => void
  onChangeRelocateTo: (option: LocationOption) => void
}

export type BaseRelocationTaskFormFields<EquipmentType = any> = {
  type: RelocationTaskTypeEnum
  equipments: EquipmentType[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  executors: IdType[]
  relocateFrom?: IdType
  relocateTo?: IdType

  // todo: удалить позже поле controller, вместо него будет controllers
  controller?: IdType
  controllers?: IdType[]

  comment?: string
}
