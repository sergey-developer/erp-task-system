import { FormInstance } from 'antd'

import {
  CountryListModel,
  MeasurementUnitListModel,
  NomenclatureGroupListModel,
  NomenclatureModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { MaybeNull } from 'shared/types/utils'

export type AddOrEditNomenclatureModalFormFields = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: MaybeNull<number>
}

export type AddOrEditNomenclatureModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  isLoading: boolean

  nomenclature?: NomenclatureModel
  nomenclatureIsLoading?: boolean

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
