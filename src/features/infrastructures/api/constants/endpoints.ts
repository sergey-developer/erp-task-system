export enum InfrastructuresApiPathsEnum {
  GetInfrastructure = '/infrastructures/:id',
  UpdateInfrastructure = '/infrastructures/:id',

  GetInfrastructureOrdersForms = '/infrastructures/orders/',
  CreateInfrastructureOrderForm = '/infrastructures/orders/',
  GetInfrastructureOrderFormWorkTypeCost = '/infrastructures/orders/works/types/cost/',
  CreateInfrastructureOrderFormWork = '/infrastructures/orders/works/',
  UpdateInfrastructureOrderFormWork = '/infrastructures/orders/works/:workId',
  DeleteInfrastructureOrdersFormsWork = '/infrastructures/orders/works/:id',

  GetInfrastructureStatusHistory = '/infrastructures/statuses/',
  UpdateInfrastructureStatus = '/infrastructures/statuses/',
  CreateInfrastructureOrdersFormAttachment = '/infrastructures/orders/attachments/',
}

export enum InfrastructuresEndpointsTagsEnum {
  Infrastructure = 'Infrastructure',
  InfrastructureOrdersForms = 'InfrastructureOrdersForms',
}
