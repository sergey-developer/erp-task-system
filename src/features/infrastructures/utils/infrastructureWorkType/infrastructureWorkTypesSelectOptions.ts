import { SelectProps } from 'antd'

import { InfrastructureWorkTypesCatalogModel } from 'shared/catalogs/models/infrastructureWorkTypes'

export const makeInfrastructureWorkTypesSelectOptions = (
  data: InfrastructureWorkTypesCatalogModel,
): SelectProps['options'] =>
  data.map(({ id, title }) => ({
    label: title,
    value: id,
  }))
