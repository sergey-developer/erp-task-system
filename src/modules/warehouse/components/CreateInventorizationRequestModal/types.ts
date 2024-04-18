import { FormInstance } from 'antd'
import { Moment } from 'moment-timezone'

import { UsersModel } from 'modules/user/models'
import { InventorizationTypeEnum } from 'modules/warehouse/constants/inventorization'
import { EquipmentNomenclaturesModel, WarehouseListModel } from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'

export type CreateInventorizationRequestFormFields = {
  type: InventorizationTypeEnum
  warehouses: IdType[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  executor: IdType
  nomenclatures?: IdType[]
}

export type CreateInventorizationRequestModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  executors: UsersModel
  executorsIsLoading: boolean

  warehouses: WarehouseListModel
  warehousesIsLoading: boolean
  onChangeWarehouses: (value: IdType[]) => void

  nomenclatures: EquipmentNomenclaturesModel
  nomenclaturesIsLoading: boolean

  onSubmit: (
    values: CreateInventorizationRequestFormFields,
    setFields: FormInstance<CreateInventorizationRequestFormFields>['setFields'],
  ) => Promise<void>
}
