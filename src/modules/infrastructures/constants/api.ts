export enum InfrastructuresApiEnum {
  GetInfrastructure = '/infrastructures/:id',
  UpdateInfrastructure = '/infrastructures/:id',
  GetInfrastructureOrdersForms = '/infrastructures/orders/',
  GetInfrastructureOrderFormWorkTypeCost = '/infrastructures/orders/works/types/cost/',
  CreateInfrastructureOrderFormWork = '/infrastructures/orders/works/',
  UpdateInfrastructureOrderFormWork = '/infrastructures/orders/works/:workId',
}

export enum InfrastructuresApiTagEnum {
  Infrastructure = 'Infrastructure',
}
