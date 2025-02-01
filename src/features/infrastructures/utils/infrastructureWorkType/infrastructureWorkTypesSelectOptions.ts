import { SelectProps } from 'antd'

import { InfrastructureWorkTypesCatalogDTO } from 'shared/catalogs/api/dto/infrastructureWorkTypes'

export const makeInfrastructureWorkTypesSelectOptions = (
  data: InfrastructureWorkTypesCatalogDTO,
): SelectProps['options'] =>
  data.map(({ id, title }) => ({
    label: title,
    value: id,
  }))
