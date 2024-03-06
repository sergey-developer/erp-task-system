import { FormInstance } from 'antd'

import { MeasurementUnitListModel } from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'

export type CreateCompletedWorkModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  measurementUnits: MeasurementUnitListModel
  measurementUnitsIsLoading: boolean

  onSubmit: (
    values: CreateCompletedWorkModalFormFields,
    setFields: FormInstance<CreateCompletedWorkModalFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateCompletedWorkModalFormFields = {
  title: string
  quantity: number
  measurementUnit: IdType
}
