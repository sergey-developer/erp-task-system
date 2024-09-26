import { InfrastructureWorkTypesCatalogModel } from 'shared/models/catalogs/infrastructureWorkTypes'

export const makeInfrastructureWorkTypesSelectOptions = (
  data: InfrastructureWorkTypesCatalogModel,
) =>
  data.map(({ id, title }) => ({
    label: title,
    value: id,
  }))
