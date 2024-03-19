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
    values: CreateCompletedWorkFormFields,
    setFields: FormInstance<CreateCompletedWorkFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateCompletedWorkFormFields = {
  title: string
  quantity: number
  measurementUnit: IdType
}
