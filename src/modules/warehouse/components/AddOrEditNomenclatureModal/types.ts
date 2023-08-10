import { FormInstance } from 'antd'

import {
  CountryListModel,
  MeasurementUnitListModel,
  NomenclatureGroupListModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureModalFormFields = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: number
}

export type AddOrEditNomenclatureModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  isLoading: boolean

  groups: NomenclatureGroupListModel
  groupsIsLoading: boolean

  countries: CountryListModel
  countriesIsLoading: boolean

  measurementUnits: MeasurementUnitListModel
  measurementUnitsIsLoading: boolean

  onSubmit: (
    values: AddOrEditNomenclatureModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
