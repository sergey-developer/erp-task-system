import { FormInstance } from 'antd'

import {
  MeasurementUnitListModel,
  NomenclatureGroupListModel,
  NomenclatureModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CountryListModel } from 'shared/models/country'
import { MaybeNull } from 'shared/types/utils'

export type NomenclatureFormModalFormFields = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  equipmentHasSerialNumber?: boolean
  country?: MaybeNull<number>
}

export type NomenclatureFormModalProps = Required<Pick<BaseModalProps, 'open' | 'onCancel'>> & {
  title: string
  okText: string
  isLoading: boolean
  submitBtnDisabled?: boolean

  nomenclature?: NomenclatureModel
  nomenclatureIsLoading?: boolean

  groups: NomenclatureGroupListModel
  groupsIsLoading: boolean

  countries: CountryListModel
  countriesIsLoading: boolean

  measurementUnits: MeasurementUnitListModel
  measurementUnitsIsLoading: boolean

  onSubmit: (
    values: NomenclatureFormModalFormFields,
    setFields: FormInstance<NomenclatureFormModalFormFields>['setFields'],
  ) => Promise<void>
}
