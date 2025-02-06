import { SelectProps } from 'antd'

import { InfrastructureWorkTypesCatalogDTO } from 'shared/catalogs/infrastructureWorkTypes/api/dto'

export const makeInfrastructureWorkTypesSelectOptions = (
  data: InfrastructureWorkTypesCatalogDTO,
): SelectProps['options'] =>
  data.map(({ id, title }) => ({
    label: title,
    value: id,
  }))
