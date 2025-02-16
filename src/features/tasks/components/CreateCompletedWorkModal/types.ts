import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { MeasurementUnitsCatalogDTO } from 'shared/catalogs/measurementUnits/api/dto'
import { IdType } from 'shared/types/common'

export type CreateCompletedWorkModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  measurementUnits: MeasurementUnitsCatalogDTO
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
