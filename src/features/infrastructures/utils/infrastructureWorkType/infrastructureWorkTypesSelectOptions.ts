import { SelectProps } from 'antd'

import { InfrastructureWorkTypesCatalogModel } from 'shared/catalogs/api/dto/infrastructureWorkTypes'

export const makeInfrastructureWorkTypesSelectOptions = (
  data: InfrastructureWorkTypesCatalogModel,
): SelectProps['options'] =>
  data.map(({ id, title }) => ({
    label: title,
    value: id,
  }))
